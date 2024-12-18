export default function HomePageComponent() {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Welcome to Piquette
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Build your app faster with highly reusable components.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#features"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </a>
              <a
                href="#about"
                className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
  
        {/* Feature Grid */}
        <section id="features" className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Features at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Reusable Components</h3>
                <p className="text-gray-600">
                  Speed up your development with a library of reusable UI components.
                </p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Modern Tech Stack</h3>
                <p className="text-gray-600">
                  Powered by Next.js, Tailwind, TRPC, and Drizzle for a scalable foundation.
                </p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Flexible Customization</h3>
                <p className="text-gray-600">
                  Tailor the framework to your specific needs and business logic.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-lg">
              Join the growing community of developers building smarter applications.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white shadow rounded-lg">
                <p className="text-gray-600 mb-4">
                    &quot;This framework has completely changed the way we build applications.&quot;
                </p>
                <span className="block text-gray-800 font-semibold">
                  — Alex Smith, Developer
                </span>
              </div>
              <div className="p-6 bg-white shadow rounded-lg">
                <p className="text-gray-600 mb-4">
                    &quot;Clean, reusable, and highly configurable components out of the box.&quot;
                </p>
                <span className="block text-gray-800 font-semibold">
                  — Brooke Johnson, Architect
                </span>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Piquette. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }