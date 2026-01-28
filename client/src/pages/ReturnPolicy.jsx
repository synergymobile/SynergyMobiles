import React from 'react';
import { RefreshCw, Truck, Clock, AlertTriangle } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 py-12 px-6 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Return Policy</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We want you to be completely satisfied with your purchase.
            </p>
          </div>
          
          <div className="p-6 md:p-12 lg:p-16 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="text-primary h-8 w-8" />
                30-Day Return Window
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You have 30 calendar days to return an item from the date you received it. 
                To be eligible for a return, your item must be unused and in the same condition that you received it. 
                Your item must be in the original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <RefreshCw className="text-primary h-8 w-8" />
                Refund Process
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Once we receive your item, we will inspect it and notify you that we have received your returned item. 
                We will immediately notify you on the status of your refund after inspecting the item. 
                If your return is approved, we will initiate a refund to your credit card (or original method of payment).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Truck className="text-primary h-8 w-8" />
                Shipping Costs
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You will be responsible for paying for your own shipping costs for returning your item. 
                Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="text-primary h-8 w-8" />
                Damaged Items
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you received a damaged product, please notify us immediately for assistance. 
                We will arrange for a replacement or full refund including shipping costs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
