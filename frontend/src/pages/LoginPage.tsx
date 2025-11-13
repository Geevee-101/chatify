import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import ResetDatabase from "../components/ResetDatabase";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl 2xl:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 h-full">
              <div className="w-full h-full max-w-md flex flex-col justify-between">
                <div>
                  {/* HEADER */}
                  <div className="text-center mb-8">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Login to access to your account</p>
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* EMAIL INPUT */}
                    <div>
                      <label className="auth-input-label">Email</label>
                      <div className="relative">
                        <MailIcon className="auth-input-icon" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="input"
                          placeholder="johndoe@gmail.com"
                        />
                      </div>
                    </div>

                    {/* PASSWORD INPUT */}
                    <div>
                      <label className="auth-input-label">Password</label>
                      <div className="relative">
                        <LockIcon className="auth-input-icon" />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="input"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button className="auth-btn hover:cursor-pointer" type="submit" disabled={isLoggingIn}>
                      {isLoggingIn ? (
                        <LoaderIcon className="w-full h-5 animate-spin text-center" />
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link to="/signup" className="auth-link">
                      Don't have an account? Sign Up
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="mt-6 text-center">
                    <ResetDatabase />
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGE COLUMN - RIGHT SIDE */}
            <div className="md:w-1/2 hidden md:flex md:flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/200 to-transparent">
              <img 
                src="login.png"
                alt="Sign Up Illustration"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Fast</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;