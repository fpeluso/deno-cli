# CREATE THE EXECUTABLE
```bash
deno install --name create-faal-mvc --allow-write --allow-read --allow-run --unstable .\src\main.ts
```

# MODIFY THE EXECUTABLE
If we try to create again the executable we get an "already exist"-like error. 
We have two ways: the first consist in using the "-f" option in the following way
```bash
deno install --name create-faal-mvc -f --allow-write --allow-read --allow-run --unstable .\src\main.ts
```
The second way is to delete manually the previous CLI executable and then launch again the deno install (but I really don't know why you should do this).
