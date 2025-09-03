export default function Cancel() {
  return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-800"></div>
        
        {/* Floating circles decoration */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-100 rounded-full opacity-20"></div>
        
        {/* Cancel animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          
          {/* Pulse rings */}
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-red-200 animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-red-300 animate-ping opacity-10" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Payment Cancelled
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              No worries, your cart is still saved!
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What would you like to do?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">Your items are still in your cart</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">You can try checkout again anytime</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">Continue shopping for more items</p>
              </div>
            </div>
          </div>

          {/* Reassurance message */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-800 font-medium">
                Don't worry! No charges were made to your account.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => window.location.href = '/cart'}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Return to Cart
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>

         

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 pt-6 opacity-30">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
  );
}