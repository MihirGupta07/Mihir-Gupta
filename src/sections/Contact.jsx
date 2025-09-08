import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter, Instagram, BookOpen, Code } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { PERSONAL_INFO, CONTACT_INFO, EMAIL_CONFIG, SOCIAL_LINKS } from '@/data/constants';
import { isValidEmail } from '@/utils/helpers';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get the appropriate icon for each social platform
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'email':
        return Mail;
      case 'instagram':
        return Instagram;
      case 'medium':
        return BookOpen;
      case 'dev':
        return Code;
      default:
        return Code;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: PERSONAL_INFO.email,
      };

      // Note: Replace these with your actual EmailJS credentials
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams,
        EMAIL_CONFIG.publicKey
      );

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: SOCIAL_LINKS.linkedin,
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT_INFO.location,
      href: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section id="contact" className="relative section-padding bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Send me a message and I'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div variants={fadeInLeft} className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                  Let's Connect
                </h3>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={method.label}
                        href={method.href}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 group"
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            {method.label}
                          </div>
                          <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {method.value}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      {CONTACT_INFO.availability}
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {CONTACT_INFO.response_time}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {Object.entries(SOCIAL_LINKS).filter(([platform, url]) => url && url.trim() !== '').slice(0, 4).map(([platform, url]) => {
                    const IconComponent = getSocialIcon(platform);
                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInRight} className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                    />
                    
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    required
                  />

                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Tell me about your project or just say hello..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    helper="Minimum 10 characters required"
                    required
                  />

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>I'll respond within 24 hours</span>
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send />}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 text-center bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
          >
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Frequently Asked Questions
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <AnimatedGrid columns={{ sm: 1, md: 2, lg: 2 }} gap={8} className="text-left">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    What's your typical response time?
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    I usually respond to emails within 24 hours, often much sooner during business hours.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Are you available for freelance projects?
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Yes! I'm always interested in discussing new opportunities and exciting projects.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    What's your preferred communication method?
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Email is best for initial contact, then we can move to video calls for detailed discussions.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Do you offer consultation services?
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Absolutely! I provide technical consulting and code reviews for teams and individual developers.
                  </p>
                </div>
              </AnimatedGrid>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
