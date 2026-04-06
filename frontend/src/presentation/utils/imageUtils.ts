export const preloadImage = (url: string) => {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = reject;
    });
};
