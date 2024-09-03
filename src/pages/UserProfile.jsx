import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/integrations/supabase';
import { getUserProfile, updateUserProfile, supabase } from '@/integrations/supabase/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { session, logout } = useSupabaseAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      fetchUserProfile();
      fetchUserImages();
    }
  }, [session, navigate]);

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setUserInfo({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        email: data.email,
        avatarUrl: data.avatar_url || '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImages = async () => {
    try {
      const { data, count, error } = await supabase
        .from('images')
        .select('*', { count: 'exact' })
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .range((page - 1) * 20, page * 20 - 1);

      if (error) throw error;

      setImages(prevImages => [...prevImages, ...(Array.isArray(data) ? data : [])]);
      setHasMore(count > page * 20);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user images",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(session.user.id, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        avatarUrl: userInfo.avatarUrl,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
    fetchUserImages();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="flex items-center space-x-8 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={userInfo.avatarUrl || "/placeholder-avatar.png"} alt="User Avatar" />
          <AvatarFallback>{userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
          <p className="text-muted-foreground">{userInfo.email}</p>
        </div>
      </div>
      <div className="space-y-4 max-w-md">
        <Input
          value={userInfo.firstName}
          onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
          disabled={!editing}
          placeholder="First Name"
        />
        <Input
          value={userInfo.lastName}
          onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
          disabled={!editing}
          placeholder="Last Name"
        />
        <Input
          value={userInfo.email}
          disabled
          placeholder="Email"
          type="email"
        />
        {editing ? (
          <Button onClick={handleSave}>Save Changes</Button>
        ) : (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img src={image.url} alt={image.caption} className="w-full h-48 object-cover rounded-lg" />
              <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
            </div>
          ))}
        </div>
        {hasMore && (
          <Button onClick={loadMoreImages} className="mt-4">Load More</Button>
        )}
      </div>
      <Button variant="outline" className="mt-8" onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default UserProfile;