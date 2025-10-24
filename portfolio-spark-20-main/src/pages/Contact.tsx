import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().min(1, { message: "Subject is required" }).max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sivansakthir7@gmail.com',
      href: 'mailto:sivansakthir7@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '88707 44263',
      href: 'tel:+91 88707 44263'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'JP college, TN, India',
      href: 'https://maps.app.goo.gl/j2baNTAv93Hsvpmh9'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/admin',
      color: 'hover:text-gray-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/admin',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/admin',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:sivansakthir7@gmail.com',
      color: 'hover:text-green-600'
    }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      if (!formRef.current) {
        throw new Error('Form reference not found');
      }

      // Set the hidden input values with validated data
      const form = formRef.current;
      const fromNameInput = form.querySelector('input[name="from_name"]') as HTMLInputElement;
      const fromEmailInput = form.querySelector('input[name="from_email"]') as HTMLInputElement;
      const subjectInput = form.querySelector('input[name="subject"]') as HTMLInputElement;
      const messageInput = form.querySelector('input[name="message"]') as HTMLInputElement;

      if (fromNameInput) fromNameInput.value = data.name;
      if (fromEmailInput) fromEmailInput.value = data.email;
      if (subjectInput) subjectInput.value = data.subject;
      if (messageInput) messageInput.value = data.message;

      await emailjs.sendForm(
        'service_pbop4gq',
        'template_dvmtkni',
        formRef.current,
        'nDyQMxRhutDHYkSdZ'
      );
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.section variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.section>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.section variants={itemVariants}>
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from_name">Name *</Label>
                        <Input
                          id="from_name"
                          {...register('name')}
                          placeholder="Your full name"
                          className="glass-card border-border/50 focus:border-primary/50"
                        />
                        <input type="hidden" name="from_name" value="" />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="from_email">Email *</Label>
                        <Input
                          id="from_email"
                          type="email"
                          {...register('email')}
                          placeholder="your.email@example.com"
                          className="glass-card border-border/50 focus:border-primary/50"
                        />
                        <input type="hidden" name="from_email" value="" />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What's this about?"
                        className="glass-card border-border/50 focus:border-primary/50"
                      />
                      <input type="hidden" name="subject" value="" />
                      {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell me about your project or idea..."
                        rows={6}
                        className="glass-card border-border/50 focus:border-primary/50 resize-none"
                      />
                      <input type="hidden" name="message" value="" />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.section>

            {/* Contact Info & Social */}
            <motion.section variants={itemVariants} className="space-y-8">
              {/* Contact Information */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Contact Information</CardTitle>
                  <CardDescription>
                    Prefer direct contact? Here are the best ways to reach me.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-lg glass-card border-border/30 hover:border-primary/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{info.label}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Connect With Me</CardTitle>
                  <CardDescription>
                    Follow my work and connect on social media platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 p-6 rounded-lg glass-card border-border/30 hover:border-primary/50 transition-all duration-300 text-center group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className={`w-8 h-8 transition-colors ${social.color} group-hover:scale-110`} />
                        <span className="text-sm font-medium">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="glass-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="text-3xl">⚡</div>
                    <div>
                      <h3 className="font-semibold mb-2">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">
                        I typically respond to emails within 24 hours. For urgent matters, feel free to call or message me on LinkedIn.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Call to Action */}
          <motion.section variants={itemVariants} className="text-center mt-16">
            <Card className="glass-card border-border/50">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold gradient-text mb-4">Ready to Start Your Project?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you need a new website, mobile app, or want to discuss a complex project, 
                  I'm here to help bring your ideas to life with cutting-edge technology and beautiful design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-glow" asChild>
                    <a href="mailto:sivansakthir7@gmail.com">
                      <Mail className="mr-2 w-4 h-4" />
                      Start a Project
                    </a>
                  </Button>
                  <Button variant="outline" className="glass-card border-border/50 hover:border-primary/50" asChild>
                    <a href="/projects">
                      View My Work
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;