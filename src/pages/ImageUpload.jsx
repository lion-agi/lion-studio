import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '@/integrations/supabase';
import { supabase } from '@/integrations/supabase/supabase';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const { session } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!session) {
    navigate('/login');
    return null;
  }

  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      caption: '',
      tags: []
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  const handleCaptionChange = (index, caption) => {
    const updatedImages = [...images];
    updatedImages[index].caption = caption;
    setImages(updatedImages);
  };

  const handleTagsChange = (index, tags) => {
    const updatedImages = [...images];
    updatedImages[index].tags = tags.split(',').map(tag => tag.trim());
    setImages(updatedImages);
  };

  const handleUpload = async () => {
    for (const image of images) {
      try {
        const file = image;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl }, error: urlError } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        if (urlError) {
          throw urlError;
        }

        const { error: insertError } = await supabase
          .from('images')
          .insert({
            user_id: session.user.id,
            url: publicUrl,
            caption: image.caption,
            tags: image.tags
          });

        if (insertError) {
          throw insertError;
        }

        toast({
          title: "Success",
          description: `Uploaded ${file.name}`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to upload ${image.name}: ${error.message}`,
          variant: "destructive",
        });
      }
    }

    setImages([]);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Images</h1>
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-muted-foreground'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag 'n' drop some images here, or click to select files</p>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((file, index) => (
          <div key={index} className="relative">
            <img src={file.preview} alt={`preview ${index}`} className="w-full h-48 object-cover rounded-lg" />
            <Input
              placeholder="Add a caption"
              className="mt-2"
              value={file.caption}
              onChange={(e) => handleCaptionChange(index, e.target.value)}
            />
            <Input
              placeholder="Add tags (comma-separated)"
              className="mt-2"
              value={file.tags.join(', ')}
              onChange={(e) => handleTagsChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <Button className="mt-8" onClick={handleUpload}>Upload Images</Button>
      )}
    </div>
  );
};

export default ImageUpload;