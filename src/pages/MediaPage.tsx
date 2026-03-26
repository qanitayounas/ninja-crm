import {
    Plus,
    Upload,
    MoreVertical,
    Search,
    LayoutGrid,
    List,
    Folder as FolderIcon
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { mediaStats, mediaFolders, recentFiles } from '../data/mediaData';
import { cn } from '../components/ui';

export const MediaPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Media Library</h1>
                    <p className="text-gray-500 font-medium">Organize and manage your files and assets</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="flex items-center gap-2 bg-ninja-dark text-white hover:bg-ninja-dark/90 border-none">
                        <Plus size={18} />
                        <span>Create Folder</span>
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Upload size={18} />
                        <span>Upload File</span>
                    </Button>
                </div>
            </div>

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
                                <button className="text-gray-300 hover:text-ninja-dark transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <h4 className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors mb-1">{folder.name}</h4>
                            <p className="text-xs text-gray-400 font-medium">
                                {folder.count} files • {folder.size}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Recent Files Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-ninja-dark">Recent Files</h2>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentFiles.map((file, idx) => (
                        <Card key={idx} className="group p-0 overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ninja-yellow/20">
                            <div className={cn("aspect-square w-full flex items-center justify-center relative overflow-hidden", file.color)}>
                                <file.icon size={48} className="text-ninja-dark/20 group-hover:scale-110 transition-transform duration-500" />
                                {/* Glass overlay on hover */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-bold text-sm text-ninja-dark truncate pr-4">{file.name}</h4>
                                    <button className="text-gray-300 hover:text-ninja-dark transition-colors shrink-0">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                    <span>{file.size}</span>
                                    <span>{file.date}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
