import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="error-page">
            {/* Stars Background */}
            <div className="stars">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                        }}
                    />
                ))}
            </div>

            <div className="error-content">
                <p className="error-subtitle">Houston,</p>
                <p className="error-subtitle">we have a problem.</p>

                <h1 className="error-code">404</h1>
                <p className="error-title">Page not found</p>

                <div className="error-actions">
                    <Link to="/admin/dashboard" className="btn-home">
                        Go to Dashboard
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Astronaut & Planet */}
            <div className="astronaut-container">
                <div className="planet"></div>
                <div className="astronaut">
                    <div className="helmet">
                        <div className="visor"></div>
                    </div>
                    <div className="body">
                        <div className="arm left"></div>
                        <div className="arm right"></div>
                        <div className="laptop">
                            <div className="screen"></div>
                        </div>
                    </div>
                    <div className="legs">
                        <div className="leg left"></div>
                        <div className="leg right"></div>
                    </div>
                </div>
            </div>

            <style>{`
        .error-page {
          min-height: 100vh;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          animation: twinkle 2s infinite ease-in-out;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .error-content {
          text-align: center;
          z-index: 10;
          margin-right: 100px;
        }

        .error-subtitle {
          color: #ffffff;
          font-size: 24px;
          font-weight: 400;
          margin: 0;
          line-height: 1.4;
        }

        .error-code {
          font-size: 180px;
          font-weight: 900;
          color: #ffffff;
          margin: 20px 0;
          line-height: 1;
          text-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .error-title {
          font-size: 32px;
          color: #ffffff;
          margin-bottom: 40px;
          font-weight: 500;
        }

        .btn-home {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-home:hover {
          background: #ffffff;
          color: #1a1a2e;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }

        .astronaut-container {
          position: absolute;
          right: 10%;
          bottom: 0;
          z-index: 5;
        }

        .planet {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
          border-radius: 50%;
          position: relative;
          box-shadow: 
            inset -30px -30px 60px rgba(0,0,0,0.3),
            0 0 60px rgba(245, 158, 11, 0.3);
        }

        .planet::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 15%;
          width: 25px;
          height: 25px;
          background: rgba(0,0,0,0.15);
          border-radius: 50%;
        }

        .planet::after {
          content: '';
          position: absolute;
          top: 40%;
          right: 25%;
          width: 40px;
          height: 40px;
          background: rgba(0,0,0,0.1);
          border-radius: 50%;
        }

        .astronaut {
          position: absolute;
          bottom: 180px;
          right: 50px;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
        }

        .helmet {
          width: 50px;
          height: 50px;
          background: #e5e7eb;
          border-radius: 50%;
          position: relative;
          margin-left: 10px;
        }

        .visor {
          position: absolute;
          top: 10px;
          left: 8px;
          width: 34px;
          height: 25px;
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
          border-radius: 50%;
        }

        .body {
          width: 60px;
          height: 50px;
          background: #e5e7eb;
          border-radius: 15px;
          position: relative;
          margin-left: 5px;
        }

        .arm {
          width: 15px;
          height: 35px;
          background: #e5e7eb;
          border-radius: 8px;
          position: absolute;
          top: 5px;
        }

        .arm.left {
          left: -12px;
          transform: rotate(30deg);
        }

        .arm.right {
          right: -12px;
          transform: rotate(-30deg);
        }

        .laptop {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 25px;
          background: #374151;
          border-radius: 3px;
        }

        .screen {
          width: 35px;
          height: 18px;
          background: #60a5fa;
          margin: 3px auto;
          border-radius: 2px;
        }

        .legs {
          display: flex;
          gap: 8px;
          margin-left: 12px;
        }

        .leg {
          width: 18px;
          height: 35px;
          background: #e5e7eb;
          border-radius: 8px;
        }

        @media (max-width: 1024px) {
          .astronaut-container {
            display: none;
          }
          
          .error-content {
            margin-right: 0;
          }
          
          .error-code {
            font-size: 120px;
          }
        }

        @media (max-width: 480px) {
          .error-code {
            font-size: 80px;
          }
          
          .error-subtitle {
            font-size: 18px;
          }
          
          .error-title {
            font-size: 24px;
          }
        }
      `}</style>
        </div>
    );
};

export default NotFound;
