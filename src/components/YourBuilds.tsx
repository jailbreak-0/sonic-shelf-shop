import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Edit, Trash2, Calendar, DollarSign, Zap, AlertTriangle, Settings, Box, Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Fan, Keyboard, Mouse } from 'lucide-react';

interface Build {
  id: string;
  name: string;
  components: any;
  total_price: number;
  total_wattage?: number;
  compatibility_notes?: string[];
  is_public: boolean;
  created_at: string;
}

interface YourBuildsProps {
  builds: Build[];
  onLoadBuild: (build: Build) => void;
  onDeleteBuild: (buildId: string) => void;
}

export function YourBuilds({ builds, onLoadBuild, onDeleteBuild }: YourBuildsProps) {
  const categoryIcons = {
    cpu: Cpu,
    gpu: Monitor,
    motherboard: CircuitBoard,
    ram: MemoryStick,
    storage: HardDrive,
    psu: Zap,
    case: Box,
    cooling: Fan,
    keyboard: Keyboard,
    mouse: Mouse,
    monitor: Monitor,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (builds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛠️</div>
        <h3 className="text-xl font-semibold mb-2">No builds yet</h3>
        <p className="text-muted-foreground mb-6">
          Create your first PC build to see it here
        </p>
        <Button onClick={() => window.location.reload()}>
          Start Building
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Your PC Builds</h2>
          <p className="text-muted-foreground">
            Manage and view your saved PC configurations
          </p>
        </div>
        <Badge variant="secondary">{builds.length} builds</Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builds.map((build) => {
          const componentCount = Object.keys(build.components || {}).length;
          
          return (
            <Card key={build.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{build.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(build.created_at)}
                    </CardDescription>
                  </div>
                  {build.is_public && <Badge variant="outline">Public</Badge>}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Components</span>
                    <span className="font-medium">{componentCount}</span>
                  </div>
                  
                  {build.total_wattage && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Wattage
                      </span>
                      <span className="font-medium">{build.total_wattage}W</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Total Price
                    </span>
                    <span className="font-bold text-primary">
                      ₵{build.total_price?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>

                {build.compatibility_notes && build.compatibility_notes.length > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 text-sm font-medium mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      Compatibility Issues
                    </div>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {build.compatibility_notes.slice(0, 2).map((note, index) => (
                        <p key={index} className="text-xs text-orange-600 dark:text-orange-300">{note}</p>
                      ))}
                      {build.compatibility_notes.length > 2 && (
                        <p className="text-xs text-orange-500">+{build.compatibility_notes.length - 2} more issues</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-1">
                  {Object.entries(build.components || {}).slice(0, 6).map(([category, component]: [string, any]) => {
                    const IconComponent = categoryIcons[category] || Box;
                    return (
                      <div key={category} className="flex items-center gap-1 p-1 bg-muted rounded text-xs">
                        <IconComponent className="h-3 w-3" />
                        <span className="capitalize truncate">{category}</span>
                        {Array.isArray(component) && (
                          <Badge variant="secondary" className="text-xs ml-auto p-0 px-1 h-4">
                            {component.length}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                  {Object.keys(build.components || {}).length > 6 && (
                    <div className="flex items-center justify-center p-1 bg-muted rounded text-xs text-muted-foreground">
                      +{Object.keys(build.components || {}).length - 6}
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onLoadBuild(build)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Load Build
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteBuild(build.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}