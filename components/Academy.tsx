// // components/Academy.tsx
// export default function Academy() {
//     const courses = [

//         {
//           title: "AI & Machine Learning Masterclass",
//           description: "Deep dive into the world of AI and learn how to build scalable machine learning models using Python, TensorFlow, and real-world datasets.",
//           image: "/academy/ai-course.jpg",
//         },
//         {
//           title: "Web Development Bootcamp",
//           description: "Master front-end and back-end development with HTML, CSS, JavaScript, React, and Node.js to become a full-stack developer.",
//           image: "/academy/webdev-course.jpg",
//         },
//         {
//           title: "Mobile App Development with Flutter",
//           description: "Build stunning cross-platform mobile apps for Android and iOS using Dart and Flutter framework.",
//           image: "/academy/mobile-course.jpg",
//         },
//         {
//           title: "UI/UX Design Fundamentals",
//           description: "Learn how to design intuitive digital experiences using Figma, wireframes, prototyping, and user research.",
//           image: "/academy/uiux-course.jpg",
//         },
//         {
//           title: "Cybersecurity Essentials",
//           description: "Understand cybersecurity principles, ethical hacking, and how to protect systems against threats and vulnerabilities.",
//           image: "/academy/cyber-course.jpg",
//         },
//         {
//           title: "Internet of Things (IoT) Development",
//           description: "Explore smart device programming, sensor integration, and real-time data collection using Raspberry Pi and Arduino.",
//           image: "/academy/iot-course.jpg",
//         },
//         {
//           title: "AI Prompt Engineering for ChatGPT",
//           description: "Master prompt engineering to create intelligent conversations with AI tools like ChatGPT, Claude, and Gemini.",
//           image: "/academy/prompt-course.jpg",
//         },
//         {
//           title: "Cloud Computing Fundamentals",
//           description: "Get hands-on experience with cloud platforms like AWS, Azure, and Google Cloud for deployment and scaling.",
//           image: "/academy/cloud-course.jpg",
//         },
//         {
//           title: "Freelancing Masterclass",
//           description: "Learn how to start, grow, and scale a profitable freelancing career using platforms like Upwork, Fiverr, and LinkedIn.",
//           image: "/academy/freelance-course.jpg",
//         },      
      
//     ];
  
//     return (
//       <section className="bg-gray-100 py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-green-700 mb-6">Our Academy</h2>
//           <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
//             Upskill yourself with cutting-edge technology courses taught by industry experts.
//           </p>
  
//           {/* Academy Courses */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {courses.map((course, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
//               >
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 mb-4">{course.title}</h3>
//                   <p className="text-gray-600 mb-6">{course.description}</p>
//                   <a
//                     href="#"
//                     className="text-green-600 font-semibold hover:text-green-700 transition"
//                   >
//                     Learn More → 
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }
  

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Academy() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">Our Academy</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Upskill yourself with cutting-edge technology courses taught by industry experts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-56 object-cover"
              />
             <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>

              <p className="text-xl font-semibold text-green-700 mb-2">
                {course.price && course.price > 0
                  ? `₦${course.price.toLocaleString()}`
                  : 'Free'}
              </p>

              <p className="text-gray-600 mb-6">
                {course.description.slice(0, 100)}...
              </p>

              <Link
                href={`/academy/${course._id}`}
                className="text-green-600 font-semibold hover:text-green-700 transition"
              >
                Learn More →
              </Link>
            </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
