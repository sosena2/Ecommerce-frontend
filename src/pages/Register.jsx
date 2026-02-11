import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alerts';
import {toast} from 'react-hot-toast'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const {register, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: 'user'
      };
      
      await register(userData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Registration failed. Please try again.');
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
         {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join thousands of satisfied customers</p>
        </div>
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {submitError && <Alert type="error" message={submitError} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                placeholder="John Doe"
                className='text-gray-500'
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
                leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                placeholder="you@example.com"
                className='text-gray-500'
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
                leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                placeholder="Create a password"
                className='text-gray-500'
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={errors.confirmPassword}
                leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                placeholder="Confirm your password"
                className='text-gray-500'
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                placeholder="+1 (555) 123-4567"
                className='text-gray-500'
              />

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                placeholder="Your address"
                className='text-gray-500'
              />
            </div>

            <div className="flex items-start">
              <input id="terms" type="checkbox" required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-500">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
