import React from 'react';
import { Shield, Lock, Eye, Database, Server } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 py-12 px-6 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We value your trust and are committed to protecting your personal information.
            </p>
          </div>
          
          <div className="p-6 md:p-12 lg:p-16 space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="text-primary h-8 w-8" />
                Information Collection
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Synergy Mobiles, we collect information to provide better services to all our users. 
                This includes information you provide to us directly (like your name, email address, and phone number) 
                and information we collect automatically (like your IP address and browsing behavior).
              </p>
            </section>

            {/* Usage */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="text-primary h-8 w-8" />
                How We Use Your Data
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Process your orders and manage your account.</li>
                <li>Send you updates about your order status.</li>
                <li>Improve our website and customer service.</li>
                <li>Send promotional emails (if you've opted in).</li>
              </ul>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="text-primary h-8 w-8" />
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information. 
                Your personal information is contained behind secured networks and is only accessible by a limited number 
                of persons who have special access rights to such systems.
              </p>
            </section>
            
            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="text-primary h-8 w-8" />
                Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to enhance your experience. Cookies are small files that a site or its service provider 
                transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's 
                systems to recognize your browser and capture and remember certain information.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-8 text-sm text-gray-500 text-center">
              <p>Last updated: January 25, 2026</p>
              <p className="mt-2">If you have any questions, please contact us at admin@synergymobiles.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
