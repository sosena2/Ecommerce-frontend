import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alerts';

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Form submitted! (UI only)');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join thousands of satisfied customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {submitError && <Alert type="error" message={submitError} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} leftIcon={<User className="h-5 w-5 text-gray-400" />} placeholder="John Doe" />
              <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} leftIcon={<Mail className="h-5 w-5 text-gray-400" />} placeholder="you@example.com" />
              <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} leftIcon={<Lock className="h-5 w-5 text-gray-400" />} placeholder="Create a password" />
              <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} leftIcon={<Lock className="h-5 w-5 text-gray-400" />} placeholder="Confirm your password" />
              <Input label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} leftIcon={<Phone className="h-5 w-5 text-gray-400" />} placeholder="+1 (555) 123-4567" />
              <Input label="Address" name="address" value={formData.address} onChange={handleChange} leftIcon={<MapPin className="h-5 w-5 text-gray-400" />} placeholder="Your address" />
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
