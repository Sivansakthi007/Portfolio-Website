import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillModal } from '@/components/modals/SkillModal';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { 
  Code2, 
  Database, 
  Palette, 
  Smartphone, 
  Cloud, 
  Search,
  Filter,
  Zap,
  Layers,
  Globe,
  Server,
  GitBranch,
  Cpu
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    {
      id: 1,
      name: 'React',
      level: 95,
      category: 'Frontend',
      description: 'Expert in React development with extensive experience in hooks, context API, state management, and modern React patterns. Proficient in building scalable, maintainable applications with React.',
      projects: ['E-Commerce Platform', 'Task Management App', 'Portfolio Website'],
      yearsOfExperience: 4,
      certifications: ['React Professional Certificate', 'Frontend Masters React'],
      icon: Code2
    },
    {
      id: 2,
      name: 'TypeScript',
      level: 88,
      category: 'Frontend',
      description: 'Advanced TypeScript developer with deep understanding of type systems, generics, utility types, and advanced patterns for building type-safe applications.',
      projects: ['E-Commerce Platform', 'Social Media API', 'Mobile Fitness Tracker'],
      yearsOfExperience: 3,
      certifications: ['TypeScript Advanced Certification'],
      icon: Code2
    },
    {
      id: 3,
      name: 'Node.js',
      level: 85,
      category: 'Backend',
      description: 'Experienced Node.js developer specializing in building scalable backend services, RESTful APIs, and microservices architecture with Express.js and various databases.',
      projects: ['E-Commerce Platform', 'Social Media API', 'Task Management App'],
      yearsOfExperience: 3,
      certifications: ['Node.js Application Developer'],
      icon: Server
    },
    {
      id: 4,
      name: 'PostgreSQL',
      level: 80,
      category: 'Database',
      description: 'Proficient in PostgreSQL database design, optimization, complex queries, indexing strategies, and performance tuning for high-traffic applications.',
      projects: ['Social Media API', 'E-Commerce Platform'],
      yearsOfExperience: 2,
      certifications: ['PostgreSQL Professional'],
      icon: Database
    },
    {
      id: 5,
      name: 'AWS',
      level: 75,
      category: 'Cloud',
      description: 'Amazon Web Services specialist with experience in EC2, S3, Lambda, RDS, CloudFormation, and serverless architectures for scalable cloud solutions.',
      projects: ['E-Commerce Platform', 'Weather Dashboard'],
      yearsOfExperience: 2,
      certifications: ['AWS Solutions Architect Associate'],
      icon: Cloud
    },
    {
      id: 6,
      name: 'React Native',
      level: 70,
      category: 'Mobile',
      description: 'Cross-platform mobile application development using React Native, with experience in navigation, state management, and native module integration.',
      projects: ['Mobile Fitness Tracker'],
      yearsOfExperience: 1,
      certifications: ['React Native Specialist'],
      icon: Smartphone
    },
    {
      id: 7,
      name: 'GraphQL',
      level: 82,
      category: 'Backend',
      description: 'Proficient in designing and implementing GraphQL APIs, schema design, resolvers, and optimizing data fetching patterns.',
      projects: ['Social Media API', 'Task Management App'],
      yearsOfExperience: 2,
      certifications: [],
      icon: GitBranch
    },
    {
      id: 8,
      name: 'Docker',
      level: 78,
      category: 'DevOps',
      description: 'Containerization expert with experience in Docker, multi-stage builds, Docker Compose, and container orchestration.',
      projects: ['E-Commerce Platform', 'Social Media API'],
      yearsOfExperience: 2,
      certifications: ['Docker Certified Associate'],
      icon: Cpu
    }
  ];

  const categories = ['all', 'Frontend', 'Backend', 'Database', 'Cloud', 'Mobile', 'DevOps'];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Frontend: 'text-blue-500',
      Backend: 'text-green-500',
      Database: 'text-purple-500',
      Cloud: 'text-orange-500',
      Mobile: 'text-pink-500',
      DevOps: 'text-indigo-500'
    };
    return colors[category] || 'text-primary';
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

  const openSkillModal = (skill: any) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const SkillCard = ({ skill }: { skill: any }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={() => openSkillModal(skill)}
    >
      <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
        <CardHeader className="text-center">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <skill.icon className="w-8 h-8 text-primary" />
          </motion.div>
          <CardTitle className="text-xl">{skill.name}</CardTitle>
          <CardDescription>{skill.category} • {skill.yearsOfExperience} years</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Proficiency</span>
                <span className="font-semibold">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{skill.description}</p>
            
            <div className="flex justify-between items-center pt-2">
              <Badge 
                variant="outline" 
                className={`${getCategoryColor(skill.category)} border-current`}
              >
                {skill.category}
              </Badge>
              <span className="text-xs text-muted-foreground">Click for details</span>
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
          <motion.section variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Skills & Expertise</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and professional expertise across various technologies and domains.
            </p>
          </motion.section>

          {/* Filters */}
          <motion.section variants={itemVariants} className="mb-12">
            <Card className="glass-card border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass-card border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-48 glass-card border-border/50">
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

          {/* All Skills */}
          <ScrollReveal>
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold gradient-text">
                  {searchTerm || filterCategory !== 'all' ? 'Search Results' : 'All Skills'}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {filteredSkills.length === 0 ? (
                <Card className="glass-card border-border/50">
                  <CardContent className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No skills found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={containerVariants}
                >
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>
          </ScrollReveal>
        </div>
      </motion.div>

      <SkillModal 
        skill={selectedSkill} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Skills;