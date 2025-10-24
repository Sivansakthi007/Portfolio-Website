import { motion, AnimatePresence } from 'framer-motion';
import certificateAwsImg from '@/assets/certificate-aws.jpg';
import certificateGcpImg from '@/assets/certificate-gcp.jpg';
import certificateMetaImg from '@/assets/certificate-meta.jpg';
import courseBannerImg from '@/assets/course-banner.jpg';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Award, Calendar, ExternalLink, Download, Building, ChevronDown, ChevronUp, Eye, Info, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024-03-15',
      expiryDate: '2027-03-15',
      credentialId: 'AWS-SAA-2024-001',
      description: 'Validates expertise in designing distributed systems on AWS, including scalable and fault-tolerant systems.',
      skills: ['Cloud Architecture', 'AWS Services', 'Security', 'Cost Optimization'],
      image: certificateAwsImg,
      verifyUrl: 'https://aws.amazon.com/verification/001',
      category: 'Cloud Computing',
      level: 'Associate'
    },
    {
      id: 2,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      issueDate: '2023-11-20',
      expiryDate: '2025-11-20',
      credentialId: 'GCP-PD-2023-005',
      description: 'Demonstrates ability to build scalable and reliable applications on Google Cloud Platform.',
      skills: ['GCP Services', 'Kubernetes', 'CI/CD', 'Microservices'],
      image: certificateGcpImg,
      verifyUrl: 'https://cloud.google.com/verification/005',
      category: 'Cloud Computing',
      level: 'Professional'
    },
    {
      id: 3,
      title: 'Meta Front-End Developer Professional',
      issuer: 'Meta (Facebook)',
      issueDate: '2023-08-10',
      expiryDate: null,
      credentialId: 'META-FED-2023-012',
      description: 'Comprehensive program covering React, JavaScript, HTML/CSS, and modern front-end development practices.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX Design'],
      image: certificateMetaImg,
      verifyUrl: 'https://meta.com/verification/012',
      category: 'Frontend Development',
      level: 'Professional'
    },
    {
      id: 4,
      title: 'MongoDB Certified Developer Associate',
      issuer: 'MongoDB Inc.',
      issueDate: '2023-06-05',
      expiryDate: '2026-06-05',
      credentialId: 'MDB-CDA-2023-008',
      description: 'Validates skills in MongoDB database design, development, and deployment.',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation Framework'],
      image: '/api/placeholder/400/300',
      verifyUrl: 'https://mongodb.com/verification/008',
      category: 'Database',
      level: 'Associate'
    },
    {
      id: 5,
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      issueDate: '2023-04-18',
      expiryDate: '2025-04-18',
      credentialId: 'DCA-2023-025',
      description: 'Demonstrates proficiency in Docker containerization, orchestration, and best practices.',
      skills: ['Docker', 'Containerization', 'Docker Compose', 'Container Security'],
      image: '/api/placeholder/400/300',
      verifyUrl: 'https://docker.com/verification/025',
      category: 'DevOps',
      level: 'Associate'
    },
    {
      id: 6,
      title: 'Kubernetes Application Developer',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: '2023-02-12',
      expiryDate: '2026-02-12',
      credentialId: 'CKAD-2023-041',
      description: 'Certifies ability to design, build and deploy cloud-native applications for Kubernetes.',
      skills: ['Kubernetes', 'Container Orchestration', 'YAML', 'Cloud Native'],
      image: '/api/placeholder/400/300',
      verifyUrl: 'https://cncf.io/verification/041',
      category: 'DevOps',
      level: 'Professional'
    },
    {
      id: 7,
      title: 'React Professional Certificate',
      issuer: 'Meta (Facebook)',
      issueDate: '2022-12-08',
      expiryDate: null,
      credentialId: 'META-REACT-2022-156',
      description: 'Advanced React development skills including hooks, context, performance optimization, and testing.',
      skills: ['React', 'Redux', 'Testing', 'Performance Optimization'],
      image: '/api/placeholder/400/300',
      verifyUrl: 'https://meta.com/verification/156',
      category: 'Frontend Development',
      level: 'Professional'
    },
    {
      id: 8,
      title: 'Node.js Application Development',
      issuer: 'OpenJS Foundation',
      issueDate: '2022-09-22',
      expiryDate: '2025-09-22',
      credentialId: 'JSNAD-2022-089',
      description: 'Validates expertise in Node.js application development, including APIs, modules, and async programming.',
      skills: ['Node.js', 'Express.js', 'API Development', 'Async Programming'],
      image: '/api/placeholder/400/300',
      verifyUrl: 'https://openjsf.org/verification/089',
      category: 'Backend Development',
      level: 'Professional'
    }
  ];

  const categories = ['All', 'Cloud Computing', 'Frontend Development', 'Backend Development', 'Database', 'DevOps'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});

  const filteredCertificates = selectedCategory === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Professional':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Associate':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
    }
  };

  const downloadCertificate = (certificate: any) => {
    // Create a temporary link to download the certificate image
    const link = document.createElement('a');
    link.href = certificate.image;
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleCardExpansion = (certificateId: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [certificateId]: !prev[certificateId]
    }));
  };

  const toggleDialog = (certificateId: number) => {
    setOpenDialogs(prev => ({
      ...prev,
      [certificateId]: !prev[certificateId]
    }));
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
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.section variants={itemVariants} className="text-center mb-8 md:mb-16">
            <div 
              className="w-full h-32 md:h-48 mb-6 rounded-xl bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${courseBannerImg})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Certifications</h1>
              </div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Professional certifications and credentials that validate my expertise across various technologies and platforms.
            </p>
          </motion.section>

          {/* Category Filter */}
          <motion.section variants={itemVariants} className="mb-6 md:mb-12 px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className={`text-xs md:text-sm ${
                    selectedCategory === category 
                      ? 'btn-glow' 
                      : 'glass-card border-border/50 hover:border-primary/50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section variants={itemVariants} className="mb-8 md:mb-16">
            <Card className="glass-card border-border/50">
              <CardContent className="pt-6">
                <div className="certificate-stats grid text-center">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{certificates.length}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Total Certificates</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                      {certificates.filter(cert => cert.level === 'Professional').length}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Professional Level</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                      {new Set(certificates.map(cert => cert.category)).size}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                      {certificates.filter(cert => cert.expiryDate && new Date(cert.expiryDate) > new Date()).length}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Active Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Certificates Grid */}
          <motion.section variants={itemVariants} className="px-4">
            <div className="certificate-grid grid">
              {filteredCertificates.map((certificate) => {
                const isExpanded = expandedCards[certificate.id];
                return (
                  <motion.div
                    key={certificate.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="certificate-card glass-card border-border/50 hover:border-primary/30 h-full overflow-hidden">
                      <div className="certificate-image relative overflow-hidden">
                        <img 
                          src={certificate.image} 
                          alt={certificate.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-2 left-2 md:top-4 md:left-4">
                          <Badge className={`certificate-badge ${getLevelColor(certificate.level)} text-white`}>
                            {certificate.level}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2 md:top-4 md:right-4">
                          <Badge variant="outline" className="certificate-badge bg-background/80">
                            {certificate.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="glass-card border-white/30 hover:border-white text-white hover:bg-white/20 text-xs px-2 py-1"
                            asChild
                          >
                            <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Verify
                            </a>
                          </Button>
                          <Dialog open={openDialogs[certificate.id]} onOpenChange={() => toggleDialog(certificate.id)}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="btn-glow text-xs px-2 py-1">
                                {openDialogs[certificate.id] ? (
                                  <>
                                    <X className="w-3 h-3 mr-1" />
                                    Close
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3 h-3 mr-1" />
                                    Open
                                  </>
                                )}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="certificate-modal glass-card border-border/50 max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="certificate-title gradient-text flex items-center gap-3">
                                  <Award className="w-5 h-5 md:w-6 md:h-6" />
                                  {certificate.title}
                                </DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4 md:space-y-6">
                                <div className="certificate-image relative overflow-hidden rounded-lg">
                                  <img 
                                    src={certificate.image} 
                                    alt={certificate.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2 text-sm md:text-base">Issuer</h4>
                                    <p className="text-muted-foreground text-sm">{certificate.issuer}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-sm md:text-base">Level</h4>
                                    <Badge className={`${getLevelColor(certificate.level)} text-white text-xs`}>
                                      {certificate.level}
                                    </Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-sm md:text-base">Issue Date</h4>
                                    <p className="text-muted-foreground text-sm">{formatDate(certificate.issueDate)}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-sm md:text-base">Status</h4>
                                    <Badge variant={
                                      certificate.expiryDate && new Date(certificate.expiryDate) > new Date()
                                        ? "default" 
                                        : certificate.expiryDate 
                                        ? "destructive" 
                                        : "default"
                                    } className="text-xs">
                                      {certificate.expiryDate 
                                        ? new Date(certificate.expiryDate) > new Date() 
                                          ? 'Active' 
                                          : 'Expired'
                                        : 'Permanent'
                                      }
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2 text-sm md:text-base">Description</h4>
                                  <p className="text-muted-foreground leading-relaxed text-sm">{certificate.description}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2 text-sm md:text-base">Skills Validated</h4>
                                  <div className="flex flex-wrap gap-1 md:gap-2">
                                    {certificate.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2 text-sm md:text-base">Credential ID</h4>
                                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">{certificate.credentialId}</code>
                                </div>
                                
                                <div className="certificate-actions flex gap-3">
                                  <Button className="btn btn-glow flex-1" asChild>
                                    <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Verify Certificate
                                    </a>
                                  </Button>
                                   <Button 
                                     variant="outline" 
                                     className="btn glass-card border-border/50 hover:border-primary/50 flex-1"
                                     onClick={() => downloadCertificate(certificate)}
                                   >
                                     <Download className="w-4 h-4 mr-2" />
                                     Download
                                   </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="certificate-title line-clamp-2">{certificate.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                          <Building className="w-3 h-3 md:w-4 md:h-4" />
                          {certificate.issuer}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Issued: {formatDate(certificate.issueDate)}</span>
                          </div>
                          
                          <AnimatePresence>
                            <motion.div
                              initial={false}
                              animate={{
                                height: isExpanded ? "auto" : "60px",
                                opacity: isExpanded ? 1 : 0.7
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {certificate.expiryDate && (
                                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                  <span>Expires: {formatDate(certificate.expiryDate)}</span>
                                </div>
                              )}
                              
                              <div className="flex flex-wrap gap-1">
                                {certificate.skills.slice(0, isExpanded ? certificate.skills.length : 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs bg-primary/10 text-primary">
                                    {skill}
                                  </Badge>
                                ))}
                                {!isExpanded && certificate.skills.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{certificate.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="mt-3 pt-3 border-t border-border/30"
                                >
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {certificate.description}
                                  </p>
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    <strong>ID:</strong> {certificate.credentialId}
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCardExpansion(certificate.id)}
                              className="flex-1 text-xs h-8 hover:bg-primary/10"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3 mr-1" />
                                  Close Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3 mr-1" />
                                  Open Details
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8 px-3"
                              asChild
                            >
                              <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Verify
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificates;