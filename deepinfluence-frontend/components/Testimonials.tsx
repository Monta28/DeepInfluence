
'use client';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Entrepreneur',
      content: 'DeepInfluence m\'a permis de trouver le mentor parfait pour développer mon entreprise. Le système de paiement en coins est très pratique et transparent.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20portrait%2C%20confident%20female%20entrepreneur%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional&width=80&height=80&seq=avatar-sarah-001&orientation=squarish',
      rating: 5
    },
    {
      name: 'Thomas Dubois',
      role: 'Consultant Marketing',
      content: 'La qualité des experts sur cette plateforme est exceptionnelle. J\'ai pu améliorer mes compétences en marketing digital grâce aux formations proposées.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20businessman%20portrait%2C%20confident%20male%20consultant%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional&width=80&height=80&seq=avatar-thomas-001&orientation=squarish',
      rating: 5
    },
    {
      name: 'Marie Lefebvre',
      role: 'Coach bien-être',
      content: 'En tant qu\'experte sur DeepInfluence, j\'apprécie la facilité d\'utilisation et la sécurité de la plateforme. Les échanges avec les clients sont fluides.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20wellness%20coach%20portrait%2C%20confident%20female%20health%20expert%2C%20modern%20professional%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20wellness%20professional&width=80&height=80&seq=avatar-marie-001&orientation=squarish',
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Témoignages
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui ont déjà transformé leur parcours grâce à DeepInfluence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover object-top mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
