import React from 'react';
import img from '../image/analysic.png'
import img2 from '../image/money.png'
const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Social Media Monetization</h1>
        <p className="lead">Maximize your earnings with our powerful tools and strategies.</p>
        <a href="#features" className="btn btn-light btn-lg">Learn More</a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row">
            {/* Analytics Card */}
            <div className="col-md-4 text-center">
              <div className="card mb-4 shadow-sm">
                <img
                  src={img}  // Replace with your image URL
                  style={{ height: '200px', objectFit: 'cover' }}
                  className="card-img-top"
                  alt="Analytics"
                />
                <div className="card-body">
                  <h3 className="card-title">Analytics</h3>
                  <p className="card-text">Track your social media performance and optimize your content for better engagement.</p>
                </div>
              </div>
            </div>

            {/* Monetization Card */}
            <div className="col-md-4 text-center">
              <div className="card mb-4 shadow-sm">
                <img
                  src={img2} // Replace with your image URL
                  className="card-img-top"
                  alt="Monetization" style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h3 className="card-title">Monetization</h3>
                  <p className="card-text">Discover new revenue streams and monetize your social media presence effectively.</p>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="col-md-4 text-center">
              <div className="card mb-4 shadow-sm">
                <img
                  src="https://www.revechat.com/wp-content/uploads/2022/02/Great-Customer-Support-jpg.webp" // Replace with your image URL
                  style={{ height: '200px', objectFit: 'cover' }}
                  className="card-img-top"
                  alt="Support"
                />
                <div className="card-body">
                  <h3 className="card-title">Support</h3>
                  <p className="card-text">Get 24/7 support from our experts to help you grow your social media empire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Ready to Start Monetizing?</h2>
          <p className="lead">Join thousands of users who are already maximizing their social media earnings.</p>
          <a href="/signup" className="btn btn-primary btn-lg">Sign Up Now</a>
        </div>
      </section>
    </div>
  );
};

export default Home;