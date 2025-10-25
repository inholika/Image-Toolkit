
import type { StaticImageData } from 'next/image';

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  content: string;
}

export const dummyPosts: Post[] = [
  {
    id: 4,
    slug: 'image-toolkit-kya-hai',
    title: 'Image Toolkit Kya Hai? (What is Image Toolkit?)',
    description: 'Image Toolkit ek powerful aur free online tool hai jo aapko aasani se images ko resize, crop, convert, aur enhance karne me madad karta hai. Jaaniye iske features ke baare mein.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 28, 2023',
    imageUrl: 'https://picsum.photos/seed/blog4/1200/800',
    imageHint: 'image editing software',
    content: `
      <p>Image Toolkit ek modern, web-based application hai jo aapko browser me hi professional-grade image editing ke liye zaroori sabhi tools pradan karta hai. Chahe aap ek web developer hon, content creator, ya bas social media ke liye apni photos ko behtar banana chahte hon, Image Toolkit aapke kaam ko aasan aur tez bana sakta hai.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">Mukhya Features (Key Features)</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Image Resizing:</strong> Aap apni images ko pixels, inches, ya centimeters me aasani se resize kar sakte hain. Aspect ratio ko lock karne ka option bhi hai, jisse image quality kharab nahi hoti.</li>
        <li><strong>Cropping Tool:</strong> Ek intuitive free-form selection tool se aap image ke kisi bhi hisse ko crop kar sakte hain.</li>
        <li><strong>Format Conversion:</strong> JPEG, PNG, WEBP jaise popular formats ke beech images ko convert karna ab bahut aasan hai.</li>
        <li><strong>AI-Powered Suggestions:</strong> Hamara AI aapke image ko analyze karke 'Grayscale' ya 'Sepia' jaise creative effects suggest karta hai, jisse aapki photo ko ek unique look milta hai.</li>
        <li><strong>Quality Control:</strong> Aap file size aur quality ke beech santulan banane ke liye compression level ko adjust kar sakte hain.</li>
      </ul>
      <h3 class="text-2xl font-bold mt-6 mb-4">Image Toolkit Kyun Istemaal Karein? (Why Use Image Toolkit?)</h3>
      <p>Sabse bada fayda iski simplicity aur speed hai. Aapko koi software download ya install karne ki zaroorat nahi hai. Sab kuch aapke browser me hota hai, jiska matlab hai ki aapki images hamesha private aur secure rehti hain. Hum unhe apne server par kabhi upload nahi karte.</p>
      <p class="mt-4">Yeh tool bilkul free hai aur hamesha rahega. Hamara maqsad ek aisa platform banana tha jo sabhi ke liye upyogi ho, bina kisi hidden cost ke.</p>
    `
  },
  {
    id: 1,
    slug: '5-tips-for-optimizing-images-for-web',
    title: '5 Tips for Optimizing Images for the Web',
    description: 'Learn how to reduce image file sizes without sacrificing quality. Faster loading times are just a few clicks away!',
    author: 'Mukesh Kumar Yogi',
    date: 'October 26, 2023',
    imageUrl: 'https://picsum.photos/seed/blog1/1200/800',
    imageHint: 'web performance speed',
    content: `
      <p>Slow-loading websites are a major turn-off for visitors. One of the biggest culprits for slow page speeds is large, unoptimized images. Here are five essential tips to optimize your images for the web using tools like Image Toolkit.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">1. Choose the Right Format</h3>
      <p>Different formats are suited for different types of images. As a general rule:</p>
      <ul class="list-disc list-inside space-y-2 my-4">
        <li><strong>JPEG:</strong> Best for photographs with lots of colors and gradients. You can adjust the quality level for a good balance between file size and appearance.</li>
        <li><strong>PNG:</strong> Use this for images that require transparency, like logos or icons. It's a lossless format, so file sizes can be larger.</li>
        <li><strong>WEBP:</strong> A modern format that provides superior lossless and lossy compression. It supports transparency and is great for both photos and graphics, but check for browser compatibility.</li>
      </ul>
      <h3 class="text-2xl font-bold mt-6 mb-4">2. Compress Your Images</h3>
      <p>Compression is key. With Image Toolkit, you can use the 'Quality' slider to reduce the file size of your JPEGs and WEBPs. For most web uses, a quality setting between 75-90% offers a great compromise between size and visual fidelity.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">3. Resize Images to the Correct Dimensions</h3>
      <p>There's no point in uploading a 4000-pixel wide image for a space that is only 800 pixels wide. Before uploading, use the resize feature in Image Toolkit to scale your images down to the exact dimensions they will be displayed at on your website.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">4. Leverage Browser Caching</h3>
      <p>This isn't an image edit, but a server configuration. Configure your server to tell browsers to store images locally for a certain period. This means on subsequent visits, the browser can load the image from its cache instead of re-downloading it, speeding up load times significantly.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">5. Use a Content Delivery Network (CDN)</h3>
      <p>A CDN stores copies of your images on servers around the world. When a user visits your site, the images are served from the server closest to them, reducing latency and loading times. It's a simple way to give your global audience a faster experience.</p>
    `
  },
  {
    id: 2,
    slug: 'understanding-image-formats',
    title: 'Understanding Image Formats: JPG, PNG, WEBP, and More',
    description: 'Which image format should you use? This guide breaks down the pros and cons of the most popular formats.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 22, 2023',
    imageUrl: 'https://picsum.photos/seed/blog2/1200/800',
    imageHint: 'file formats code',
    content: `
      <p>Choosing the right image format can feel confusing, but it has a huge impact on your website's performance and visual quality. This guide will help you understand the most common formats available in Image Toolkit and when to use each one.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">JPEG (Joint Photographic Experts Group)</h3>
      <p><strong>Pros:</strong> Excellent for photos, supports millions of colors, offers great compression to keep file sizes small.</p>
      <p><strong>Cons:</strong> It's a "lossy" format, meaning some image data is permanently discarded during compression, which can create artifacts if over-compressed. Does not support transparency.</p>
      <p><strong>Best for:</strong> Photographs and complex images with many colors and gradients.</p>
      
      <h3 class="text-2xl font-bold mt-6 mb-4">PNG (Portable Network Graphics)</h3>
      <p><strong>Pros:</strong> "Lossless" compression, meaning no quality is lost. Supports transparency, making it perfect for logos, icons, and graphics with sharp lines.</p>
      <p><strong>Cons:</strong> File sizes are significantly larger than JPEGs, especially for complex photos.</p>
      <p><strong>Best for:</strong> Logos, icons, text-heavy images, and any graphic that needs a transparent background.</p>

      <h3 class="text-2xl font-bold mt-6 mb-4">WEBP</h3>
      <p><strong>Pros:</strong> A modern format developed by Google. It offers both lossy and lossless compression that is often better than JPEG and PNG, resulting in smaller file sizes at similar quality. It also supports transparency and animation.</p>
      <p><strong>Cons:</strong> While browser support is now excellent, very old browsers might not be able to display WEBP images.</p>
      <p><strong>Best for:</strong> Almost everything. It's a versatile, high-performance format for nearly any image on the web.</p>
      
      <h3 class="text-2xl font-bold mt-6 mb-4">GIF (Graphics Interchange Format)</h3>
      <p><strong>Pros:</strong> Supports animation, making it the classic choice for simple animated images. Lossless compression.</p>
      <p><strong>Cons:</strong> Limited to only 256 colors, which can make photos look poor. File sizes for animations can be very large compared to modern video formats.</p>
      <p><strong>Best for:</strong> Short, simple animations and logos with flat colors.</p>
    `
  },
  {
    id: 3,
    slug: 'introducing-ai-feature-suggestions',
    title: 'Introducing AI-Powered Feature Suggestions',
    description: 'Discover how our new AI feature can help you find the perfect edits for your photos automatically.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 18, 2023',
    imageUrl: 'https://picsum.photos/seed/blog3/1200/800',
    imageHint: 'artificial intelligence robot',
    content: `
      <p>We're thrilled to announce a groundbreaking new feature in Image Toolkit: AI-Powered Feature Suggestions! This intelligent tool is designed to take the guesswork out of image editing and help you discover creative possibilities you might not have considered.</p>
      <h3 class="text-2xl font-bold mt-6 mb-4">How Does It Work?</h3>
      <p>When you upload an image, our application now has an "AI Suggestions" section. Behind the scenes, we securely send your image to a powerful generative AI model (Google's Gemini) for analysis. The AI looks at the content of your image—its colors, subjects, and composition—and suggests relevant editing features.</p>
      <p class="mt-4">For example, for a vintage-style photo, it might suggest a 'Sepia' filter. For a dramatic black and white landscape, it might suggest 'Grayscale'. The goal is to provide a creative starting point for your edits.</p>
      
      <h3 class="text-2xl font-bold mt-6 mb-4">Privacy First</h3>
      <p>Your privacy remains our top priority. The image data is sent for analysis only to provide the suggestions. We do not store your image or the AI's response on our servers. The entire process is designed to be ephemeral and secure, consistent with our client-side philosophy.</p>

      <h3 class="text-2xl font-bold mt-6 mb-4">What's Next for AI in Image Toolkit?</h3>
      <p>This is just the beginning. We're exploring more advanced AI features, such as:</p>
      <ul class="list-disc list-inside space-y-2 my-4">
        <li><strong>Smart Cropping:</strong> Automatically suggesting the best composition by identifying the main subject.</li>
        <li><strong>Color Enhancement:</strong> Intelligently adjusting brightness, contrast, and saturation.</li>
        <li><strong>Background Removal:</strong> A one-click tool to remove the background from your photos.</li>
      </ul>
      <p>We're excited to continue building tools that make powerful image editing accessible to everyone. Give the new AI suggestions a try and let us know what you think!</p>
    `
  },
];
