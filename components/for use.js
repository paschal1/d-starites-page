// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const blogPosts = [
//   {
//     id: 1,
//     title: "5 Ways AI is Transforming Small Businesses",
//     excerpt: "Discover how artificial intelligence is empowering small businesses to scale smarter and faster.",
//     image: "/blog/blog1.jpg",
//     author: "D-Starite Team",
//     date: "May 2, 2025",
//     slug: "/blog/ai-transforming-small-businesses",
//   },
//   {
//     id: 2,
//     title: "Top 7 Tech Trends to Watch in 2025",
//     excerpt: "From quantum computing to sustainable tech — stay ahead with the latest trends shaping tomorrow.",
//     image: "/blog/blog3.jpg",
//     author: "Jane Okoro",
//     date: "April 18, 2025",
//     slug: "/blog/top-tech-trends-2025",
//   },
//   {
//     id: 3,
//     title: "Building Scalable Digital Products: A Step-by-Step Guide",
//     excerpt: "Learn how to design, develop, and deploy scalable tech solutions with our expert framework.",
//     image: "/blog/blog2.jpg",
//     author: "D-Starite Dev Team",
//     date: "April 4, 2025",
//     slug: "/blog/building-scalable-products",
//   },
//   // Add more dummy posts here if needed...
// ];

// export default function BlogSection() {
//   const postsPerLoad = 3;
//   const [visibleCount, setVisibleCount] = useState(postsPerLoad);

//   const visiblePosts = blogPosts.slice(0, visibleCount);
//   const hasMore = visibleCount < blogPosts.length;

//   return (
//     <section className="bg-white py-20">
//       <div className="container mx-auto px-4">
//         {/* Section Title */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-800 mb-3">Latest Insights & Articles</h2>
//           <p className="text-gray-500 max-w-xl mx-auto">
//             Explore deep dives, updates, and innovations from the minds at D-Starite Technologies.
//           </p>
//         </div>

//         {/* Blog Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {visiblePosts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
//             >
//               <Link href={post.slug}>
//                 <div className="relative w-full h-56">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
//               </Link>

//               <div className="p-6">
//                 <p className="text-sm text-green-600 font-semibold mb-1">{post.date}</p>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   <Link href={post.slug} className="hover:text-green-700 transition-colors">
//                     {post.title}
//                   </Link>
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500 italic">By {post.author}</span>
//                   <Link
//                     href={post.slug}
//                     className="text-green-600 text-sm font-medium hover:underline"
//                   >
//                     Read More →
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View More Button */}
//         {hasMore && (
//           <div className="text-center mt-12">
//             <button
//               onClick={() => setVisibleCount((prev) => prev + postsPerLoad)}
//               className="px-6 py-3 bg-green-700 text-white text-sm font-semibold rounded-full hover:bg-green-800 transition-all duration-300 shadow"
//             >
//               View More Articles
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// components/Academy.tsx
export default function Academy() {
    const courses = [

        {
          title: "AI & Machine Learning Masterclass",
          description: "Deep dive into the world of AI and learn how to build scalable machine learning models using Python, TensorFlow, and real-world datasets.",
          image: "/academy/ai-course.jpg",
        },
        {
          title: "Web Development Bootcamp",
          description: "Master front-end and back-end development with HTML, CSS, JavaScript, React, and Node.js to become a full-stack developer.",
          image: "/academy/webdev-course.jpg",
        },
        {
          title: "Mobile App Development with Flutter",
          description: "Build stunning cross-platform mobile apps for Android and iOS using Dart and Flutter framework.",
          image: "/academy/mobile-course.jpg",
        },
        {
          title: "UI/UX Design Fundamentals",
          description: "Learn how to design intuitive digital experiences using Figma, wireframes, prototyping, and user research.",
          image: "/academy/uiux-course.jpg",
        },
        {
          title: "Cybersecurity Essentials",
          description: "Understand cybersecurity principles, ethical hacking, and how to protect systems against threats and vulnerabilities.",
          image: "/academy/cyber-course.jpg",
        },
        {
          title: "Internet of Things (IoT) Development",
          description: "Explore smart device programming, sensor integration, and real-time data collection using Raspberry Pi and Arduino.",
          image: "/academy/iot-course.jpg",
        },
        {
          title: "AI Prompt Engineering for ChatGPT",
          description: "Master prompt engineering to create intelligent conversations with AI tools like ChatGPT, Claude, and Gemini.",
          image: "/academy/prompt-course.jpg",
        },
        {
          title: "Cloud Computing Fundamentals",
          description: "Get hands-on experience with cloud platforms like AWS, Azure, and Google Cloud for deployment and scaling.",
          image: "/academy/cloud-course.jpg",
        },
        {
          title: "Freelancing Masterclass",
          description: "Learn how to start, grow, and scale a profitable freelancing career using platforms like Upwork, Fiverr, and LinkedIn.",
          image: "/academy/freelance-course.jpg",
        },      
      
    ];
  
    return (
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Our Academy</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Upskill yourself with cutting-edge technology courses taught by industry experts.
          </p>
  
          {/* Academy Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  <a
                    href="#"
                    className="text-green-600 font-semibold hover:text-green-700 transition"
                  >
                    Learn More → 
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }