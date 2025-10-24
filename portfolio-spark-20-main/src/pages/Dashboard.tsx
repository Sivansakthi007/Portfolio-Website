import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typewriter } from '@/components/ui/typewriter';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { DashboardStatSkeleton } from '@/components/ui/loading-skeleton';
import { Download, Github, Linkedin, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const downloadResume = () => {
    const name = user?.email?.split('@')[0] || 'Professional Developer';
    const email = user?.email || 'contact@example.com';
    const phone = '+1 (555) 123-4567';
    const location = 'San Francisco, CA';
    const linkedin = 'linkedin.com/in/johndoe';
    const github = 'github.com/johndoe';
    const portfolio = window.location.origin;
    
    // Create professional resume content
    const resumeContent = `
════════════════════════════════════════════════════════════════
                    PROFESSIONAL RESUME
════════════════════════════════════════════════════════════════

${name.toUpperCase()}
${user?.profession || 'Full-Stack Developer'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION

Email:      ${email}
Phone:      ${phone}
Location:   ${location}
LinkedIn:   ${linkedin}
GitHub:     ${github}
Portfolio:  ${portfolio}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL SUMMARY

${user?.profession || 'Full-Stack Developer'} with 5+ years of experience in 
building scalable web applications and digital solutions. Passionate about 
creating user-centric applications that solve real-world problems and deliver 
exceptional user experiences.

${user?.bio || 'Experienced in modern web technologies including React, TypeScript, Node.js, and cloud platforms. Strong focus on clean code, best practices, and collaborative development.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS

Frontend Development
• React.js, TypeScript, JavaScript (ES6+)
• HTML5, CSS3, Tailwind CSS
• Responsive Design, UI/UX Implementation
• State Management (Redux, Context API)
• Framer Motion, Animation Libraries

Backend Development
• Node.js, Express.js
• RESTful API Design
• GraphQL
• Database Design & Optimization
• Authentication & Authorization (JWT, OAuth)

Database Technologies
• PostgreSQL, MongoDB
• Redis, Supabase
• Database Migrations & ORM

Cloud & DevOps
• AWS (EC2, S3, Lambda, RDS)
• Docker, Kubernetes
• CI/CD Pipelines
• Git, GitHub Actions
• Vercel, Netlify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL EXPERIENCE

Senior Full-Stack Developer
Tech Solutions Inc. | San Francisco, CA
2022 - Present

• Led development of scalable web applications serving 100K+ users
• Architected and implemented microservices infrastructure
• Improved application performance by 40% through optimization
• Mentored junior developers and conducted code reviews
• Collaborated with cross-functional teams on product roadmap

Frontend Developer
Digital Agency | San Francisco, CA
2020 - 2022

• Built responsive web applications using React and TypeScript
• Collaborated with designers to create pixel-perfect UIs
• Implemented reusable component libraries
• Optimized frontend performance and accessibility
• Integrated RESTful APIs and third-party services

Junior Developer
Startup Co. | San Francisco, CA
2019 - 2020

• Developed features for MVP products
• Gained experience with full-stack development
• Participated in agile development processes
• Contributed to code documentation and testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION

Master of Computer Science
University of Technology
2017 - 2019
Specialized in Software Engineering and Web Technologies

Bachelor of Information Technology
State University
2013 - 2017
Foundation in Programming, Databases, and System Design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CERTIFICATIONS

• AWS Solutions Architect - Associate
• Google Cloud Professional Certificate
• Meta Front-End Developer Certificate
• MongoDB Certified Developer
• React Professional Certificate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECTS

E-Commerce Platform
• Full-stack e-commerce solution with React, Node.js, and Stripe
• Features: User authentication, product catalog, shopping cart
• Technologies: React, Node.js, MongoDB, Stripe, JWT

Task Management App
• Collaborative task management with real-time updates
• Drag-and-drop kanban boards, team collaboration features
• Technologies: React, Firebase, PWA, Material-UI

Mobile Fitness Tracker
• React Native app for fitness tracking and workout plans
• Progress monitoring, social features, health API integration
• Technologies: React Native, Expo, Redux, AsyncStorage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACHIEVEMENTS

• Successfully delivered 12+ production-ready projects
• Contributed to open-source projects with 500+ GitHub stars
• Improved team productivity by 30% through process optimization
• Recognized as Employee of the Quarter (Q2 2023)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGES

English - Native/Fluent
Spanish - Conversational

════════════════════════════════════════════════════════════════
                    END OF RESUME
════════════════════════════════════════════════════════════════
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}_Professional_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Resume Downloaded!",
      description: "Your professional resume has been downloaded successfully.",
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign in with Google",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/johndoe', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/johndoe', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@johndoe.dev';
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Projects', value: '12+', icon: '💼' },
    { label: 'Years Experience', value: '5+', icon: '🚀' },
    { label: 'Technologies', value: '15+', icon: '⚡' },
    { label: 'Certificates', value: '8', icon: '🏆' },
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/300/200',
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com/example/project'
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Modern portfolio with animations and dark theme',
      technologies: ['React', 'Framer Motion', 'Tailwind'],
      image: '/api/placeholder/300/200',
      demoUrl: 'https://portfolio.example.com',
      repoUrl: 'https://github.com/example/portfolio'
    }
  ];

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
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      
      <div className="pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4"
        >
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="text-center py-12 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white"
              >
                {user?.name?.charAt(0) || 'U'}
              </motion.div>

              <motion.h1
                className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <Typewriter 
                  words={[user?.name || 'Developer', 'a Creator', 'an Innovator']}
                  className="gradient-text"
                />
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4"
              >
                {user?.profession || 'Full-Stack Developer'} passionate about creating amazing digital experiences
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4"
              >
                <Button 
                  className="btn-glow"
                  onClick={downloadResume}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-card border-border/50 hover:border-primary/50"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-6"
              >
              {[
                { icon: Github, onClick: handleGitHubClick, label: 'GitHub' },
                { icon: Linkedin, onClick: handleLinkedInClick, label: 'LinkedIn' },
                { icon: Mail, onClick: handleEmailClick, label: 'Email' },
              ].map((social, index) => (
                <motion.button
                  key={social.label}
                  onClick={social.onClick}
                  className="p-3 rounded-full glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <ScrollReveal>
            <section className="py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {loading ? (
                  Array(4).fill(0).map((_, index) => (
                    <DashboardStatSkeleton key={index} />
                  ))
                ) : (
                  stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center"
                    >
                      <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="pt-6">
                          <motion.div 
                            className="text-3xl mb-2"
                            whileHover={{ rotate: 10, scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {stat.icon}
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-bold gradient-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          </ScrollReveal>

          {/* About Preview */}
          <motion.section variants={itemVariants} className="py-16">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {user?.bio || "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating user-centric applications that solve real-world problems and deliver exceptional user experiences."}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Available for hire</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Recent Projects */}
          <motion.section variants={itemVariants} className="py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold gradient-text">Recent Projects</h2>
              <Button variant="outline" className="glass-card border-border/50 hover:border-primary/50">
                View All Projects
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/50">
                        {project.title.charAt(0)}
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <Button size="sm" className="btn-glow">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;