import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Briefcase, GraduationCap, Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const About = () => {
  const { user } = useAuth();

  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
      technologies: ['React', 'Node.js', 'AWS', 'TypeScript']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Built responsive web applications and collaborated with design teams to create pixel-perfect UIs.',
      technologies: ['React', 'Vue.js', 'Sass', 'JavaScript']
    },
    {
      title: 'Junior Developer',
      company: 'Startup Co.',
      period: '2019 - 2020',
      description: 'Developed features for MVP products and gained experience with full-stack development.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Science',
      school: 'University of Technology',
      period: '2017 - 2019',
      description: 'Specialized in Software Engineering and Web Technologies'
    },
    {
      degree: 'Bachelor of Information Technology',
      school: 'State University',
      period: '2013 - 2017',
      description: 'Foundation in programming, databases, and system design'
    }
  ];

  const interests = [
    'Open Source Contributions',
    'Machine Learning',
    'Photography',
    'Travel',
    'Music Production',
    'Gaming'
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
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.section variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my journey, experience, and what drives me as a developer.
            </p>
          </motion.section>

          {/* Personal Info */}
          <motion.section variants={itemVariants} className="mb-16">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Personal Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {user?.bio || "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. My journey began with a curiosity about how websites work, which led me to dive deep into both frontend and backend technologies."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and creating user experiences that are both beautiful and functional. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or capturing moments through photography.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Experience */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 flex items-center gap-2">
              <Briefcase className="w-7 h-7" />
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <CardTitle className="text-xl">{exp.title}</CardTitle>
                          <CardDescription className="text-lg font-medium text-primary">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
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

          {/* Education */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 flex items-center gap-2">
              <GraduationCap className="w-7 h-7" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <CardTitle className="text-xl">{edu.degree}</CardTitle>
                          <CardDescription className="text-lg font-medium text-primary">
                            {edu.school}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-bold gradient-text mb-8">Interests & Hobbies</h2>
            <Card className="glass-card border-border/50">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 rounded-lg glass-card border-border/30 hover:border-primary/30 transition-all duration-300"
                    >
                      <span className="text-sm font-medium">{interest}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default About;