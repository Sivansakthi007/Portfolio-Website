import { motion } from 'framer-motion';
import project1Img from '@/assets/project-1.jpg';
import project2Img from '@/assets/project-2.jpg';
import project3Img from '@/assets/project-3.jpg';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ExternalLink, Github, Search, Filter, Star, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, and order management.',
      longDescription: 'A comprehensive e-commerce platform built with modern technologies. The frontend uses React with TypeScript for type safety, while the backend is powered by Node.js and Express. Features include real-time inventory updates, secure payment processing with Stripe, user reviews and ratings, admin dashboard for product management, and responsive design for all devices.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Tailwind CSS'],
      category: 'Full-Stack',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://ecommerce-demo.example.com',
      repoUrl: 'https://github.com/example/ecommerce-platform',
      featured: true,
      status: 'Completed',
      year: '2024'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
      longDescription: 'A sophisticated task management application designed for teams. Built with React and Firebase for real-time synchronization, it features drag-and-drop kanban boards, team member assignment, deadline tracking, file attachments, and comprehensive reporting. The app uses Progressive Web App (PWA) technologies for offline functionality.',
      technologies: ['React', 'Firebase', 'PWA', 'Material-UI', 'Context API'],
      category: 'Frontend',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://taskmaster-demo.example.com',
      repoUrl: 'https://github.com/example/task-management',
      featured: true,
      status: 'Completed',
      year: '2024'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and weather alerts.',
      longDescription: 'A comprehensive weather dashboard that provides current conditions, 7-day forecasts, and severe weather alerts. Features include geolocation support, interactive maps with weather overlays, historical weather data, and customizable widgets. Built with React and integrates multiple weather APIs for accurate data.',
      technologies: ['React', 'Weather API', 'Maps API', 'Chart.js', 'Geolocation'],
      category: 'Frontend',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://weather-dashboard.example.com',
      repoUrl: 'https://github.com/example/weather-dashboard',
      featured: false,
      status: 'Completed',
      year: '2023'
    },
    {
      id: 4,
      title: 'Social Media API',
      description: 'RESTful API for social media platform with user management, posts, comments, and real-time messaging.',
      longDescription: 'A robust backend API built with Node.js and Express, featuring user authentication with JWT, post creation and management, comment system, real-time messaging with Socket.io, image upload and processing, and comprehensive API documentation with Swagger.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'JWT', 'Swagger'],
      category: 'Backend',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://api-docs.example.com',
      repoUrl: 'https://github.com/example/social-api',
      featured: false,
      status: 'Completed',
      year: '2023'
    },
    {
      id: 5,
      title: 'Mobile Fitness Tracker',
      description: 'React Native mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
      longDescription: 'A comprehensive fitness tracking mobile application built with React Native. Features include custom workout creation, exercise library with video demonstrations, progress tracking with charts, social sharing, goal setting, and integration with health APIs.',
      technologies: ['React Native', 'Expo', 'Redux', 'AsyncStorage', 'Health APIs'],
      category: 'Mobile',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://fitness-app-demo.example.com',
      repoUrl: 'https://github.com/example/fitness-tracker',
      featured: true,
      status: 'In Progress',
      year: '2024'
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations, dark theme, and CMS integration for easy content management.',
      longDescription: 'A stunning portfolio website built with React and Framer Motion for smooth animations. Features include a content management system for easy updates, optimized performance, SEO-friendly structure, contact form integration, and responsive design across all devices.',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'CMS', 'SEO'],
      category: 'Frontend',
      image: '/api/placeholder/400/250',
      demoUrl: 'https://portfolio.example.com',
      repoUrl: 'https://github.com/example/portfolio',
      featured: false,
      status: 'Completed',
      year: '2024'
    }
  ];

  const categories = ['all', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(project => project.featured);

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

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const ProjectCard = ({ project, featured = false }: { project: any, featured?: boolean }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: featured ? 1.01 : 1.02 }}
      className={`group ${featured ? 'lg:col-span-2' : ''}`}
    >
      <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
        <div className={`aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden ${featured ? 'aspect-[2/1]' : ''}`}>
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-primary/90 text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/50">
            {project.title.charAt(0)}
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Button size="sm" className="btn-glow" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
            <Button size="sm" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          </div>
        </div>
        
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className={featured ? 'text-2xl' : 'text-xl'}>{project.title}</CardTitle>
            <div className="flex flex-col gap-1">
              <Badge variant="outline" className="text-xs">
                {project.year}
              </Badge>
              <Badge 
                variant={project.status === 'Completed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {project.status}
              </Badge>
            </div>
          </div>
          <CardDescription className={featured ? 'text-base' : ''}>
            {featured ? project.longDescription : project.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{project.category}</Badge>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => openProjectModal(project)}
              className="hover:bg-primary/10"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.section variants={itemVariants} className="text-center mb-8 md:mb-16 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">My Projects</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work spanning web applications, mobile apps, and backend services.
            </p>
          </motion.section>

          {/* Filters */}
          <motion.section variants={itemVariants} className="mb-6 md:mb-12 px-4">
            <Card className="glass-card border-border/50">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects, technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass-card border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full md:w-48 glass-card border-border/50">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-border/50">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Featured Projects */}
          {searchTerm === '' && filterCategory === 'all' && (
            <ScrollReveal direction="up" delay={0.2}>
              <section className="mb-16">
                <h2 className="text-3xl font-bold gradient-text mb-8">Featured Projects</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <ProjectCard project={project} featured />
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* All Projects */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold gradient-text">
                  {searchTerm || filterCategory !== 'all' ? 'Search Results' : 'All Projects'}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {filteredProjects.length === 0 ? (
                <Card className="glass-card border-border/50">
                  <CardContent className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4"
                  variants={containerVariants}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>
          </ScrollReveal>
        </div>
      </motion.div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Projects;