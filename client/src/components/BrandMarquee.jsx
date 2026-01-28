import React from 'react';

const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg' },
  { name: 'OnePlus', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/OnePlus_Logo.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Realme', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Realme_logo.svg' },
  { name: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Huawei_Logo.svg' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sony_logo.svg' },
  { name: 'Infinix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Infinix_logo.svg/2560px-Infinix_logo.svg.png' },
  { name: 'Tecno', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tecno_Mobile_logo.svg/2560px-Tecno_Mobile_logo.svg.png' }
];

const BrandMarquee = () => {
  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="container-custom mb-6">
        <h3 className="text-center text-gray-400 font-medium text-sm uppercase tracking-widest">Trusted by Millions</h3>
      </div>
      
      <div className="relative w-full">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        
        <div className="flex w-max animate-scroll hover:pause">
          {/* First set of logos */}
          <div className="flex items-center gap-16 px-8">
            {brands.map((brand, index) => (
              <div key={`brand-1-${index}`} className="flex flex-col items-center justify-center group cursor-pointer min-w-[120px]">
                <div className="h-12 w-auto flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  {/* Using text if image fails or for simplicity, but trying image first */}
                   <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-full w-auto object-contain max-w-[120px]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-2xl font-bold text-gray-800 hidden">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Duplicate set for infinite scroll */}
          <div className="flex items-center gap-16 px-8">
            {brands.map((brand, index) => (
              <div key={`brand-2-${index}`} className="flex flex-col items-center justify-center group cursor-pointer min-w-[120px]">
                <div className="h-12 w-auto flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                   <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-full w-auto object-contain max-w-[120px]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-2xl font-bold text-gray-800 hidden">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
