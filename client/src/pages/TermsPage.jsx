import React from 'react';
import { FileText, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 py-12 px-6 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Please read these terms carefully before using our service.
            </p>
          </div>
          
          <div className="p-6 md:p-12 lg:p-16 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="text-primary h-8 w-8" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable 
                to such services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <CheckCircle className="text-primary h-8 w-8" />
                Product Descriptions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Synergy Mobiles attempts to be as accurate as possible. However, we do not warrant that product descriptions 
                or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered 
                by Synergy Mobiles itself is not as described, your sole remedy is to return it in unused condition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertCircle className="text-primary h-8 w-8" />
                Pricing & Availability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All prices are subject to change without notice. We reserve the right to limit quantities. 
                In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <HelpCircle className="text-primary h-8 w-8" />
                Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan. 
                Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
