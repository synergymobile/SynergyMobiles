import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f140481d458a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Contact Support" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/50"></div>
        </div>

        <div className="container-custom px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">24/7 Support</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Start a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Have questions about our products, support, or warranty? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative -mt-20 pb-20 z-20">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Information Card */}
            <div className="lg:col-span-1 bg-gray-900 text-white rounded-3xl p-8 shadow-2xl h-fit">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <p className="text-gray-400 mb-8">Fill up the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                    <p className="font-semibold text-lg">+92 300 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Address</p>
                    <p className="font-semibold text-lg">info@synergymobiles.pk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Headquarters</p>
                    <p className="font-semibold text-lg">Shop #42, Liberty Market, Gulberg III, Lahore</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Business Hours</p>
                    <p className="font-semibold text-lg">Mon - Sat: 10AM - 9PM</p>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="relative mt-12 h-32 overflow-hidden rounded-xl bg-gray-800/50 p-6">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                <p className="relative z-10 text-gray-300 italic">"Excellent customer service is our number one priority."</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-gray-600"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Support">Technical Support</option>
                    <option value="Sales">Sales & Orders</option>
                    <option value="Warranty">Warranty Claim</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div className="bg-gray-100 rounded-3xl overflow-hidden h-[400px] relative shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.043642730635!2d74.33968231515286!3d31.50974798137311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a5b045191%3A0x6966141473214534!2sLiberty%20Market%20Gulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1647856723456!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;