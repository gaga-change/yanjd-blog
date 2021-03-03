FROM hayd/alpine-deno:1.7.2

EXPOSE 8710

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache mod.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--unstable", "mod.ts"]
