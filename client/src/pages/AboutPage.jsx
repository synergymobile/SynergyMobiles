import React from 'react';
import { Shield, Users, Award, TrendingUp, CheckCircle, Truck, Clock, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Office Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900"></div>
        </div>
        
        <div className="container-custom px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            ESTABLISHED 2020
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bridging the Gap Between <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Innovation & You</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are Pakistan's premier destination for authentic mobile technology. Dedicated to bringing you the latest devices with official warranties and unmatched support.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Our Team Working" 
                className="relative rounded-3xl shadow-2xl z-10 w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block max-w-xs border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className="font-bold text-gray-900">Exponential</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Serving thousands of happy customers across the nation every month.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Your Digital Lifestyle
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At SynergyMobiles, we believe that technology should be accessible, reliable, and affordable. Founded with a vision to eliminate the uncertainty in buying electronics, we have built a reputation for transparency and trust.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our mission is simple: to provide a seamless shopping experience where you never have to worry about authenticity or after-sales support. We are not just selling phones; we are building relationships.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle, text: '100% Original Products' },
                  { icon: Truck, text: 'Nationwide Delivery' },
                  { icon: Shield, text: 'Official Warranty' },
                  { icon: Clock, text: '24/7 Customer Support' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide every decision we make and every interaction we have.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Trust & Integrity', 
                desc: 'We operate with complete transparency. What you see is exactly what you get, with no hidden terms.',
                color: 'bg-blue-500'
              },
              { 
                icon: Heart, 
                title: 'Customer Obsession', 
                desc: 'Your satisfaction is our top priority. We go the extra mile to ensure you love your purchase.',
                color: 'bg-red-500'
              },
              { 
                icon: Award, 
                title: 'Quality Excellence', 
                desc: 'We only stock products from reputable brands that meet our strict quality standards.',
                color: 'bg-purple-500'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800/30 skew-x-12 transform translate-x-20"></div>
        
        <div className="container-custom px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
            {[
              { number: '50k+', label: 'Happy Customers' },
              { number: '100%', label: 'Authentic Products' },
              { number: '50+', label: 'Premium Brands' },
              { number: '4.9', label: 'Average Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;