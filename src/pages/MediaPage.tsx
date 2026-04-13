import { useState, useEffect, useRef } from 'react';
import {
    Upload,
    MoreVertical,
    Search,
    LayoutGrid,
    List,
    Folder as FolderIcon,
    Image,
    FileText,
    Film,
    Music,
    Trash2,
    X,
    Eye
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { cn } from '../components/ui';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

const typeIcons: Record<string, any> = { image: Image, document: FileText, video: Film, audio: Music };
const typeColors: Record<string, string> = { image: 'bg-blue-50', document: 'bg-orange-50', video: 'bg-purple-50', audio: 'bg-green-50' };

export const MediaPage = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [actionFile, setActionFile] = useState<any>(null);
    const [previewFile, setPreviewFile] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadMedia();
    }, []);

    const loadMedia = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.getMedia();
            setFiles(data || []);
        } catch (error) {
            console.error('Error loading media:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        setIsUploading(true);
        let successCount = 0;

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', file.name);

                const token = localStorage.getItem('ninja_crm_token') || sessionStorage.getItem('ninja_crm_token');
                const res = await fetch('http://localhost:5000/api/media/upload', {
                    method: 'POST',
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                    body: formData
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.details?.message || err.error || 'Upload failed');
                }

                const result = await res.json();
                const fType = file.type.split('/')[0];
                setFiles(prev => [{
                    id: result.fileId || `temp-${Date.now()}`,
                    name: file.name,
                    url: result.url || '',
                    type: file.type,
                    _mediaType: fType,
                    size: file.size,
                    createdAt: new Date().toISOString(),
                    contentType: file.type
                }, ...prev]);
                successCount++;
            } catch (error: any) {
                console.error(`Failed to upload ${file.name}:`, error);
                toast.error(`Failed: ${file.name} — ${error.message}`);
            }
        }

        if (successCount > 0) {
            toast.success(`${successCount} file${successCount > 1 ? 's' : ''} uploaded!`);
        }
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (fileId: string) => {
        try {
            await apiService.deleteMedia(fileId);
            setFiles(prev => prev.filter(f => (f.id || f._id) !== fileId));
            toast.success('File deleted');
            setDeleteId(null);
        } catch (error: any) {
            toast.error('Failed to delete file');
        }
    };

    const getFileType = (f: any) => {
        if (f._mediaType && f._mediaType !== 'file') return f._mediaType;
        if (f.type && f.type !== 'file' && !f.type.startsWith('file')) return f.type.split('/')[0];
        if (f.contentType && !f.contentType.startsWith('file')) return f.contentType.split('/')[0];
        // Detect from file name extension
        const name = (f.name || f.altTag || '').toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/.test(name)) return 'image';
        if (/\.(mp4|mov|avi|wmv|webm|mkv)$/.test(name)) return 'video';
        if (/\.(mp3|wav|ogg|aac|flac)$/.test(name)) return 'audio';
        if (/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv)$/.test(name)) return 'document';
        return 'document';
    };

    const mediaStats = [
        { label: 'Total Files', value: String(files.length) },
        { label: 'Images', value: String(files.filter(f => getFileType(f) === 'image').length) },
        { label: 'Documents', value: String(files.filter(f => ['document', 'application'].includes(getFileType(f))).length) },
        { label: 'Videos', value: String(files.filter(f => getFileType(f) === 'video').length) },
    ];

    const mediaFolders = [
        { name: 'Images', count: files.filter(f => getFileType(f) === 'image').length, color: 'bg-blue-50' },
        { name: 'Documents', count: files.filter(f => ['document', 'application'].includes(getFileType(f))).length, color: 'bg-orange-50' },
        { name: 'Videos', count: files.filter(f => getFileType(f) === 'video').length, color: 'bg-purple-50' },
        { name: 'Audio', count: files.filter(f => getFileType(f) === 'audio').length, color: 'bg-green-50' },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                className="hidden"
                onChange={handleUpload}
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Media Library</h1>
                    <p className="text-gray-500 font-medium">Organize and manage your files and assets</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center gap-2"
                    >
                        <Upload size={18} />
                        <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                    </Button>
                </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
                <Card className="p-4 border-l-4 border-l-ninja-yellow bg-ninja-yellow/5">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-ninja-yellow"></div>
                        <p className="text-sm font-bold text-ninja-dark">Uploading to GHL Media Library...</p>
                    </div>
                </Card>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaStats.map((stat, idx) => (
                    <Card key={idx} className="flex flex-col gap-2 p-6 hover:scale-[1.02] transition-all duration-300">
                        <p className="text-sm font-bold text-gray-400">{stat.label}</p>
                        <h3 className="text-2xl font-black text-ninja-dark">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            {/* Folders Section */}
            <div>
                <h2 className="text-xl font-bold text-ninja-dark mb-6">Folders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mediaFolders.map((folder, idx) => (
                        <Card key={idx} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", folder.color)}>
                                    <FolderIcon size={24} className="text-ninja-dark/50" />
                                </div>
                            </div>
                            <h4 className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors mb-1">{folder.name}</h4>
                            <p className="text-xs text-gray-400 font-medium">{folder.count} files</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Files Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-ninja-dark">
                        {files.length > 0 ? `All Files (${files.length})` : 'No Files Yet'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block w-64">
                            <Input icon={Search} placeholder="Search files..." className="bg-white border-none shadow-sm" />
                        </div>
                        <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                            <button className="p-2 text-ninja-yellow bg-ninja-yellow/5 rounded-lg">
                                <LayoutGrid size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-ninja-dark transition-colors">
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {files.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Upload size={48} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-lg font-bold text-ninja-dark mb-2">No files yet</h3>
                        <p className="text-gray-400 text-sm mb-6">Upload your first file to get started</p>
                        <Button onClick={() => fileInputRef.current?.click()} className="mx-auto">
                            <Upload size={16} className="mr-2" /> Upload Files
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {files.map((f, idx) => {
                            const fType = getFileType(f);
                            const FileIcon = typeIcons[fType] || Image;
                            const fColor = typeColors[fType] || 'bg-gray-50';
                            const name = f.name || f.altTag || 'Untitled';
                            const isImage = fType === 'image' && f.url;

                            return (
                                <Card key={f.id || f._id || idx} className="group p-0 overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ninja-yellow/20">
                                    <div
                                        className={cn("aspect-square w-full flex items-center justify-center relative overflow-hidden cursor-pointer", isImage ? '' : fColor)}
                                        onClick={() => setPreviewFile(f)}
                                    >
                                        {isImage ? (
                                            <img src={f.url} alt={name} className="w-full h-full object-cover" />
                                        ) : (
                                            <FileIcon size={48} className="text-ninja-dark/20 group-hover:scale-110 transition-transform duration-500" />
                                        )}
                                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-1">
                                            <h4 className="font-bold text-sm text-ninja-dark truncate pr-4">{name}</h4>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActionFile(f); }}
                                                className="text-gray-300 hover:text-ninja-dark transition-colors shrink-0"
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                            <span>{f.size ? `${(f.size / 1024).toFixed(1)} KB` : fType}</span>
                                            <span>{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : '--'}</span>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* File Actions Sheet */}
            {actionFile && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActionFile(null)} />
                    <div className="relative bg-white w-full sm:w-96 sm:rounded-2xl rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-200 overflow-hidden">
                        {/* File info header */}
                        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", typeColors[getFileType(actionFile)] || 'bg-gray-50')}>
                                {getFileType(actionFile) === 'image' && actionFile.url
                                    ? <img src={actionFile.url} alt="" className="w-full h-full object-cover rounded-lg" />
                                    : (() => { const Icon = typeIcons[getFileType(actionFile)] || Image; return <Icon size={18} className="text-ninja-dark/40" />; })()
                                }
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-ninja-dark text-sm truncate">{actionFile.name || actionFile.altTag || 'Untitled'}</h4>
                                <p className="text-[10px] text-gray-400 font-medium">{actionFile.size ? `${(actionFile.size / 1024).toFixed(1)} KB` : getFileType(actionFile)}</p>
                            </div>
                            <button onClick={() => setActionFile(null)} className="text-gray-400 hover:text-ninja-dark p-1">
                                <X size={18} />
                            </button>
                        </div>
                        {/* Actions */}
                        <div className="py-2">
                            <button
                                onClick={() => { setPreviewFile(actionFile); setActionFile(null); }}
                                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Eye size={18} className="text-gray-400" /> Preview File
                            </button>
                            {actionFile.url && (
                                <a
                                    href={actionFile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setActionFile(null)}
                                    className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Upload size={18} className="text-gray-400" /> Open in New Tab
                                </a>
                            )}
                            <div className="border-t border-gray-100 my-1" />
                            <button
                                onClick={() => { setDeleteId(actionFile.id || actionFile._id); setActionFile(null); }}
                                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={18} /> Delete File
                            </button>
                        </div>
                        {/* Mobile safe area */}
                        <div className="h-2 sm:hidden" />
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-black text-ninja-dark mb-2">Delete File?</h3>
                        <p className="text-sm text-gray-400 mb-6">This will permanently remove the file from GHL.</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
                            <Button onClick={() => handleDelete(deleteId)} className="bg-red-500 hover:bg-red-600 border-red-500 text-white">Delete</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewFile(null)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="font-bold text-ninja-dark truncate">{previewFile.name || previewFile.altTag || 'Preview'}</h3>
                            <button onClick={() => setPreviewFile(null)} className="text-gray-400 hover:text-ninja-dark"><X size={20} /></button>
                        </div>
                        <div className="p-4 flex items-center justify-center min-h-[300px] bg-gray-50">
                            {getFileType(previewFile) === 'image' && previewFile.url ? (
                                <img src={previewFile.url} alt={previewFile.name} className="max-w-full max-h-[60vh] object-contain rounded-lg" />
                            ) : getFileType(previewFile) === 'video' && previewFile.url ? (
                                <video src={previewFile.url} controls className="max-w-full max-h-[60vh] rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <FileText size={64} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-gray-400 font-medium">Preview not available</p>
                                    {previewFile.url && (
                                        <a href={previewFile.url} target="_blank" rel="noopener noreferrer" className="text-ninja-yellow font-bold text-sm mt-2 inline-block hover:underline">
                                            Open in new tab
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
