# BracketsSync
This is a relatively crude implementation of what I eventually plan to be a Brackets Extension to synchronize
your Preferences and Extensions between environments using either a git repository or cloud storage.

### Usage for Windows
Currently I have only implemented rudimentary usage for Windows whereby a user can run 'setup-windows.cmd' and
enter their repository (storage) location and it will create a symbolic link from the 'brackets.json' file and
'extensions' folder to the specified location. You can see my preferences and extensions in this repository.