// components/WorkingProcess.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCode, faCogs } from "@fortawesome/free-solid-svg-icons";

const processSteps = [
  {
    icon: faRocket, // FontAwesome Icon for Initiation & Planning
    title: "Initiation & Planning",
    description: "We are architects and trailblazers of technological advancement.",
  },
  {
    icon: faCode, // FontAwesome Icon for Execution & Development
    title: "Execution & Development",
    description: "We turn ideas into scalable, innovative solutions.",
  },
  {
    icon: faCogs, // FontAwesome Icon for Testing & Maintenance
    title: "Testing & Maintenance",
    description: "We ensure reliability through rigorous testing and ongoing support.",
  },
];

export default function WorkingProcess() {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-green-700 mb-16">Our Working Process</h3>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-16 md:gap-0">
          {/* Dotted Line Behind Circles */}
          <div className="absolute hidden md:block top-12 left-0 right-0 mx-auto border-t border-dotted border-green-500 z-0" />

          {processSteps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center w-64">
              {/* Icon Circle with Notification Number */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="text-green-700 text-3xl"
                  />
                </div>

                {/* Number Badge */}
                <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow ring-2 ring-white">
                  {`0${index + 1}`}
                </span>
              </div>

              {/* Title and Description */}
              <h4 className="text-lg font-semibold text-green-700 mb-1">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
