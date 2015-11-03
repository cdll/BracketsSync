define(function(require, exports, module){
    var ko = require('../vendor/knockout');

    function ProjectsViewModel(){
        var self = this,
            _ = require('../vendor/lodash'),
            ProjectsProvider = require('../providers/projects'),
            projectsProvider = new ProjectsProvider(),
            ColorProvider = require('../providers/colors'),
            colorProvider = new ColorProvider(),
            ProjectManager = brackets.getModule('project/ProjectManager'),
            prefs = require('../services/prefs'),
            PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
            modalService = require('../services/modal'),
            modals = require('../enums/modals');

        this.projects = ko.observableArray([]);
        this.favoriteProjects = ko.observableArray([]);

        this.selected = ko.observableArray(prefs.get('filter') || []);

        this.query = ko.observable('');
        this.query.subscribe(function(){
            self.init();
        });

        this.favorites = ko.observableArray(prefs.get('favorites') || []);
        this.customs = ko.observableArray(prefs.get('customs') || []);

        this.getAlias = function(folder){
            if (typeof folder !== 'string' || folder.length === 0){
                return '#';
            }

            return folder[0].toUpperCase();
        }

        this.getColor = function(str){
            return colorProvider.get(str);
        }

        this.calculateColorDiff = function(hexcolor){
            return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff/2) ? 'black':'white';
        }

        this.getAliasColor = function(project){
            return self.calculateColorDiff(project.background);
        }

        this.open = function(project){
            ProjectManager.openProject(project.path);
            $('.projects_modal .dialog-button').trigger('click');
        }

        this.favorite = function(project, event){
            if (self.favorites().indexOf(project.folder) !== -1){
                self.favorites.remove(project.folder);
                self.projects.push(project);
                self.favoriteProjects.remove(project);
            } else {
                self.favorites.push(project.folder);
                self.projects.remove(project);
                self.favoriteProjects.push(project);
            }

            prefs.set('favorites', self.favorites());
            event.stopPropagation();
        }

        this.removeFromFavorites = function(project){
            self.favorites.remove(project.folder);
            prefs.set('favorites', self.favorites());
        }

        this.isFavorite = function(model){
            return self.favorites().indexOf(model.folder) !== -1;
        }

        this.isFavoritesSelected = function(){
            return _.contains(self.selected(), 'favorite');
        }

        this.isRegularSelected = function(){
            return _.contains(self.selected(), 'regular');
        }

        this.isHiddenSelected = function(){
            return _.contains(self.selected(), 'hidden');
        }

        this.select = function(id){
            if (_.contains(self.selected(), id)){
                self.selected.remove(id);
            } else {
                self.selected.push(id);
            }

            prefs.set('filter', self.selected());
        }

        this.selectFavorite = function(){
            self.select('favorite');
        }

        this.selectRegular = function(){
            self.select('regular');
        }

        this.selectHidden = function(){
            self.select('hidden');
        }

        this.getProjectList = function(){
            var query = (self.query() || '').toLowerCase();

            if (!query){
                return projectsProvider.getProjectList();
            } else {
                return _.filter(projectsProvider.getProjectList(), function(project){
                    return project.folder.toLowerCase().indexOf(query) !== -1 ||
                        project.path.toLowerCase().indexOf(query) !== -1;
                });
            }
        }

        this.openFolder = function(){
            ProjectManager.openProject();
        }

        this.remove = function(project){
            var projects = PreferencesManager.getViewState('recentProjects');

            _.remove(projects, function(projectPath){
                return projectPath ===project.path;
            });

            PreferencesManager.setViewState("recentProjects", projects);

            self.removeFromProjects(project);
            self.removeFromFavorites(project);

            event.stopPropagation();
        }

        this.removeFromProjects = function(project){
            this.projects.remove(project);
            this.favoriteProjects.remove(project);
        }

        this.options = function(project){
            //close this modal
            $('.projects_modal .dialog-button').trigger('click');

            setTimeout(function(){
                modalService.showHandler(modals.OPTIONS, {
                    project: project
                });
            }, 1);
        }

        this.isCustomImage = function(project){
            return !!(_.find(self.customs(), function(custom){
                return custom.path === project.path;
            }) || {}).image;
        }

        this.isCustomName = function(project){
            return (_.find(self.customs(), function(custom){
                return custom.path === project.path;
            }) || {}).name;
        }

        this.getCustomName = function(project){
            return _.find(self.customs(), function(custom){
                return custom.path === project.path;
            }).name;
        }

        this.getBackground = function(project){
            var custom = _.find(self.customs(), function(custom){
                return custom.path === project.path;
            });

            if (custom && custom.image){
                return custom.image;
            } else {
                return project.background;
            }
        }

        this.hoverProject = ko.observable(null);

        this.mouseout = function(){
            self.hoverProject(null);
        }

        this.mouseover = function(project){
            self.hoverProject(project);
        }

        this.init = function(){
            var projects = self.getProjectList(),
                favoriteProjects;

            _.each(projects, function(project){
                project.background = self.getColor(project.folder);
            });

            favoriteProjects = _.remove(projects, function(project){
                return self.favorites.indexOf(project.folder) !== -1;
            });

            this.projects(projects);
            this.favoriteProjects(favoriteProjects);
        }

        this.getPreviousProject = function(){
            var cProject = this.hoverProject(),
                projects,
                selectNext = false,
                selected = null;

            if (!cProject){
                if (this.isRegularSelected()){
                    return _.last(this.projects());
                }
                else if (this.isFavoritesSelected()){
                    return _.last(this.favoriteProjects());
                }
            } else {
                projects = [];

                if (this.isRegularSelected()){
                    projects = _.clone(this.projects()).reverse();
                }

                if (this.isFavoritesSelected()){
                    projects = _.union(projects, _.clone(this.favoriteProjects()).reverse());
                }

                _.each(projects, function(project){
                    if (selectNext){
                        selected = project;
                        return false;
                    }

                    selectNext = project === cProject;
                });

                return selected;
            }
        }

        this.getNextProject = function(){
            var cProject = this.hoverProject(),
                projects,
                selectNext = false,
                selected = null;

            if (!cProject){
                if (this.isFavoritesSelected()){
                    return _.first(this.favoriteProjects());
                } else if (this.isRegularSelected()){
                    return _.first(this.projects());
                }
            } else {
                projects = [];

                if (this.isFavoritesSelected()){
                    projects = this.favoriteProjects();
                }

                if (this.isRegularSelected()){
                    projects = _.union(projects, this.projects());
                }

                _.each(projects, function(project){
                    if (selectNext){
                        selected = project;
                        return false;
                    }

                    selectNext = project === cProject;
                });

                return selected;
            }
        }

        this.keypress = function(model, event){
            var keyCode = event.keyCode;

            if (keyCode === 40){
                //down
                self.hoverProject(self.getNextProject());
            } else if (keyCode === 38){
                self.hoverProject(self.getPreviousProject());
            }

            return true;
        }

        this.init();

        setTimeout(function(){
            $('.projects_modal .search').focus();
        }, 100);
    }

    module.exports = ProjectsViewModel;
});
