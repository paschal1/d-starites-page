export default function About() {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-green-700 mb-4">Who We Are</h3>
            <p className="text-gray-800 leading-relaxed">
            At D-Starite Technologies, we are driven by a passion for innovation and a commitment to transforming the future of business. Founded on the belief that technology is the key to solving today's complex challenges, we specialize in providing forward-thinking solutions that empower businesses and individuals alike.

Our diverse team of experts works tirelessly to design and develop cutting-edge software, advanced tech tools, and scalable digital products that help organizations optimize operations, increase efficiency, and achieve their goals. We understand that the success of a business relies not only on the tools it uses but also on the knowledge and skills of its people. That’s why we offer expert training and educational resources that enable individuals and teams to thrive in an ever-evolving digital landscape.

At D-Starite, innovation is at the core of everything we do. From AI-powered business solutions to custom-built software platforms, our solutions are tailored to meet the unique needs of each client, ensuring they stay ahead of the competition. Whether you're looking to optimize your processes, scale your business, or foster a culture of continuous learning, D-Starite Technologies is here to guide you every step of the way.

We believe that the future is built on collaboration and knowledge-sharing, which is why we actively engage with the tech community, fostering a culture of growth and continuous improvement. Together, we can harness the power of technology to create meaningful impact and drive real change in the world.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/about-us-placeholder.jpg" alt="About Us" className="rounded-lg shadow-md w-full" />
          </div>
        </div>
      </section>
    );
  }
  