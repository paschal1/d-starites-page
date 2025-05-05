// components/Team.tsx
import Image from "next/image";

const teamMembers = [
  {
    name: "Paschal Nwokeocha",
    role: "Founder & CEO",
    image: "/team/paschal.jpg",
  },
  {
    name: "Confidence Theophilus",
    role: "Lead Software Engineer",
    image: "/team/confidence.jpg",
  },
  {
    name: "Emmanuel Okwudiri",
    role: "Software Engineer",
    image: "/team/emmanuel.jpg",
  },
  {
    name: "Kelvin Ophoke",
    role: "Digital Marketing Strategist",
    image: "/team/kelvin.jpg",
  },
];

export default function Team() {
  return (
    <section className="bg-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-green-700 mb-10">Meet the Team</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          The passionate minds driving innovation and delivering value at D-Starite Technologies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow text-center hover:shadow-md transition">
              {/* Increase the size of the image container */}
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h4 className="text-lg font-bold text-green-700">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
