import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Github, Linkedin, Instagram, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/data/constants';
import { isValidEmail } from '@/utils/helpers';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem, fadeInUp } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

const socialIcons = {
  github: <Github className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  medium: <BookOpen className="w-4 h-4" />,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
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
      const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
      const payload = {
        embeds: [{
          title: `New Contact: ${formData.subject}`,
          color: 0x3b82f6,
          fields: [
            { name: 'Name', value: formData.name, inline: true },
            { name: 'Email', value: formData.email, inline: true },
            { name: 'Message', value: formData.message },
          ],
          timestamp: new Date().toISOString(),
        }],
      };
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Discord webhook responded with ${res.status}`);
      toast.success("Message sent. I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Discord webhook error:', error);
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="mb-16">
            <h2 className="text-section font-semibold text-neutral-900 dark:text-neutral-100 mb-4" style={{ textWrap: 'balance' }}>
              Contact
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Have a project in mind or want to talk? Send a message and I'll respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: contact info */}
            <motion.div variants={fadeInLeft} className="lg:col-span-1 space-y-8">
              {/* Contact details */}
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_INFO.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {CONTACT_INFO.location}
                </div>
              </div>

              {/* Availability */}
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-0.5">
                      {CONTACT_INFO.availability}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {CONTACT_INFO.response_time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {Object.entries(SOCIAL_LINKS)
                  .filter(([platform, url]) => url && socialIcons[platform])
                  .map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={platform}
                    >
                      {socialIcons[platform]}
                    </motion.a>
                  ))}
              </div>
            </motion.div>

            {/* Right: contact form */}
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
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Response within 24 hours</span>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send />}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
