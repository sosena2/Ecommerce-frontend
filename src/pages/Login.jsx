import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alerts';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Login submitted! (UI only)');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {submitError && <Alert type="error" message={submitError} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} leftIcon={<Mail className="h-5 w-5 text-gray-400" />} placeholder="you@example.com" />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} leftIcon={<Lock className="h-5 w-5 text-gray-400" />} placeholder="Enter your password" />

            <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-500">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
