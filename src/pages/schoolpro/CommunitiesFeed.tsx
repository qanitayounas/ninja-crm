import { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  PlusCircle,
  TrendingUp,
  Users,
  Loader2
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

// Fallback feed data when API returns nothing
const fallbackFeedPosts = [
  { id: 1, user: 'Community Member', avatar: 'CM', time: 'Recently', content: 'Welcome to the community feed! Start a conversation.', likes: 0, comments: 0, shares: 0 }
];
const fallbackTopics = [
  { tag: '#Courses', trend: 'up' },
  { tag: '#Learning', trend: 'up' },
];

const communityColors = ['bg-ninja-yellow', 'bg-purple-500', 'bg-ninja-yellow'];

export const CommunitiesFeed = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        apiService.getCourses()
            .then((data) => setCourses(data || []))
            .catch(() => setCourses([]))
            .finally(() => setLoading(false));
    }, []);

    const activeCommunitiesSidebar = courses.length > 0
        ? courses.slice(0, 3).map((c: any, i: number) => ({
            title: c.name || c.title || `Community ${i + 1}`,
            members: c.studentCount || c.students || 0,
            color: communityColors[i % communityColors.length]
          }))
        : [{ title: 'No communities yet', members: 0, color: 'bg-gray-400' }];

    // Build feed posts from course data
    const feedPosts = courses.length > 0
        ? courses.slice(0, 5).map((c: any, i: number) => ({
            id: c.id || i + 1,
            user: c.instructorName || c.name || `Course ${i + 1}`,
            avatar: (c.name || 'C').substring(0, 2).toUpperCase(),
            time: c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : 'Recently',
            content: c.description || `Updates from ${c.name || 'this course'}. Join the discussion!`,
            likes: c.studentCount || 0,
            comments: c.lessonCount || 0,
            shares: 0
          }))
        : fallbackFeedPosts;

    const trendingTopics = courses.length > 0
        ? courses.slice(0, 4).map((c: any) => ({
            tag: `#${(c.name || c.title || 'Course').replace(/\s+/g, '')}`,
            trend: 'up'
          }))
        : fallbackTopics;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {/* Main Feed Column */}
            <div className="lg:col-span-2 space-y-6">
                {/* Create Post Input */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-3xl flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-ninja-yellow flex items-center justify-center text-ninja-dark font-black text-xs">
                        TU
                    </div>
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="What do you want to share with the community?" 
                            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400 font-medium"
                        />
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center text-ninja-yellow hover:scale-110 transition-transform">
                        <PlusCircle size={24} />
                    </button>
                </Card>

                {/* Posts List */}
                {feedPosts.map((post) => (
                    <Card key={post.id} className="p-8 border-none shadow-sm bg-white rounded-[2.5rem] space-y-6 hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-black">
                                    {post.avatar}
                                </div>
                                <div>
                                    <h4 className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{post.user}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.time}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-ninja-dark">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-line">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                            <PostAction icon={Heart} count={post.likes} color="hover:text-red-500" />
                            <PostAction icon={MessageCircle} count={post.comments} color="hover:text-ninja-yellow" />
                            <PostAction icon={Share2} count={post.shares} color="hover:text-blue-500" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                {/* Active Communities */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Active Communities</h3>
                    <div className="space-y-6">
                        {activeCommunitiesSidebar.map((community, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white", community.color)}>
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors leading-tight">{community.title}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{community.members} members</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Trending Topics */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Trending Topics</h3>
                    <div className="space-y-6">
                        {trendingTopics.map((topic, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                                <span className="text-sm font-black text-gray-500 group-hover:text-ninja-dark transition-colors">{topic.tag}</span>
                                <TrendingUp size={16} className="text-green-500" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const PostAction = ({ icon: Icon, count, color }: { icon: any, count: number, color: string }) => (
    <button className={cn("flex items-center gap-2 text-gray-400 transition-colors", color)}>
        <Icon size={18} />
        <span className="text-xs font-black">{count}</span>
    </button>
);
