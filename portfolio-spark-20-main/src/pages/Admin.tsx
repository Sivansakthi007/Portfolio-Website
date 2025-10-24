import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, Users, FolderOpen, Award, Settings, BarChart3 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Mock data - in real app, this would come from your backend
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution',
      technologies: ['React', 'Node.js', 'MongoDB'],
      status: 'Completed',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management',
      technologies: ['React', 'Firebase'],
      status: 'Completed',
      featured: true
    }
  ]);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024-03-15',
      category: 'Cloud Computing'
    },
    {
      id: 2,
      title: 'React Professional Certificate',
      issuer: 'Meta (Facebook)',
      issueDate: '2022-12-08',
      category: 'Frontend Development'
    }
  ]);

  const stats = [
    { title: 'Total Projects', value: projects.length, icon: FolderOpen },
    { title: 'Featured Projects', value: projects.filter(p => p.featured).length, icon: BarChart3 },
    { title: 'Certificates', value: certificates.length, icon: Award },
    { title: 'Admin Actions', value: '24', icon: Settings }
  ];

  const handleSaveProject = (projectData: any) => {
    if (selectedProject) {
      // Update existing project
      setProjects(projects.map(p => p.id === selectedProject.id ? { ...projectData, id: selectedProject.id } : p));
      toast({ title: "Project updated successfully!" });
    } else {
      // Add new project
      const newProject = { ...projectData, id: Date.now() };
      setProjects([...projects, newProject]);
      toast({ title: "Project added successfully!" });
    }
    setSelectedProject(null);
    setIsEditing(false);
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast({ title: "Project deleted successfully!" });
  };

  const handleSaveCertificate = (certData: any) => {
    if (selectedCertificate) {
      // Update existing certificate
      setCertificates(certificates.map(c => c.id === selectedCertificate.id ? { ...certData, id: selectedCertificate.id } : c));
      toast({ title: "Certificate updated successfully!" });
    } else {
      // Add new certificate
      const newCert = { ...certData, id: Date.now() };
      setCertificates([...certificates, newCert]);
      toast({ title: "Certificate added successfully!" });
    }
    setSelectedCertificate(null);
    setIsEditing(false);
  };

  const handleDeleteCertificate = (certId: number) => {
    setCertificates(certificates.filter(c => c.id !== certId));
    toast({ title: "Certificate deleted successfully!" });
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

  const ProjectForm = ({ project, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(project || {
      title: '',
      description: '',
      technologies: '',
      status: 'In Progress',
      featured: false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        technologies: formData.technologies.split(',').map((t: string) => t.trim())
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input
            id="technologies"
            value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, Node.js, MongoDB"
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="btn-glow">
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  const CertificateForm = ({ certificate, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(certificate || {
      title: '',
      issuer: '',
      issueDate: '',
      category: 'Frontend Development'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cert-title">Certificate Title</Label>
          <Input
            id="cert-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer</Label>
          <Input
            id="issuer"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="issue-date">Issue Date</Label>
          <Input
            id="issue-date"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="DevOps">DevOps</option>
            <option value="Database">Database</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="btn-glow">
            <Save className="w-4 h-4 mr-2" />
            Save Certificate
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    );
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
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Admin Dashboard</h1>
                <p className="text-xl text-muted-foreground">
                  Manage your portfolio content and settings
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Users className="w-4 h-4 mr-2" />
                Admin Access
              </Badge>
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={stat.title} className="glass-card border-border/50">
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Management Tabs */}
          <motion.section variants={itemVariants}>
            <Tabs defaultValue="projects" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Projects Management */}
              <TabsContent value="projects" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold gradient-text">Manage Projects</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-glow" onClick={() => setSelectedProject(null)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription>Create a new project entry for your portfolio.</DialogDescription>
                      </DialogHeader>
                      <ProjectForm 
                        onSave={handleSaveProject}
                        onCancel={() => setSelectedProject(null)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="glass-card border-border/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {project.title}
                              {project.featured && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  Featured
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedProject(project)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass-card border-border/50 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Project</DialogTitle>
                                  <DialogDescription>Update project information.</DialogDescription>
                                </DialogHeader>
                                <ProjectForm 
                                  project={selectedProject}
                                  onSave={handleSaveProject}
                                  onCancel={() => setSelectedProject(null)}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProject(project.id)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Certificates Management */}
              <TabsContent value="certificates" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold gradient-text">Manage Certificates</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-glow" onClick={() => setSelectedCertificate(null)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Certificate</DialogTitle>
                        <DialogDescription>Add a new professional certification.</DialogDescription>
                      </DialogHeader>
                      <CertificateForm 
                        onSave={handleSaveCertificate}
                        onCancel={() => setSelectedCertificate(null)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="glass-card border-border/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{cert.title}</CardTitle>
                            <CardDescription>{cert.issuer}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedCertificate(cert)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass-card border-border/50 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Certificate</DialogTitle>
                                  <DialogDescription>Update certificate information.</DialogDescription>
                                </DialogHeader>
                                <CertificateForm 
                                  certificate={selectedCertificate}
                                  onSave={handleSaveCertificate}
                                  onCancel={() => setSelectedCertificate(null)}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCertificate(cert.id)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Badge variant="outline">{cert.category}</Badge>
                          <p className="text-sm text-muted-foreground">
                            Issued: {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold gradient-text">Portfolio Settings</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card border-border/50">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your basic profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={user?.name || ''} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user?.email || ''} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Profession</Label>
                        <Input value={user?.profession || ''} readOnly />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-border/50">
                    <CardHeader>
                      <CardTitle>Portfolio Settings</CardTitle>
                      <CardDescription>Configure your portfolio preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Public Portfolio</Label>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Contact Form</Label>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Analytics</Label>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <Button className="w-full btn-glow">
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;