import IPost from "@/core/entities/Post";

interface IInsertPostHashtag {
    text: string;
    position: number;

    id?: string;
}

export interface IImageToUpload {
    file: File;
    url: string;
}

export interface IInsertPostRequest {
    targetPost: IInsertPost;
    images: File[];
    hashtags?: IInsertPostHashtag[];
}

export interface IInsertPost {
    description: string;
    closeFriends?: boolean;
    pinned?: boolean;
}

// const formData = new FormData()
//
// for (const item of fileList) {
//     formData.append('images', item.file)
// }