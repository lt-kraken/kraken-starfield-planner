#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["KrakenSoftware.Starfield.Planner.WebApi/KrakenSoftware.Starfield.Planner.WebApi.csproj", "KrakenSoftware.Starfield.Planner.WebApi/"]
RUN dotnet restore "KrakenSoftware.Starfield.Planner.WebApi/KrakenSoftware.Starfield.Planner.WebApi.csproj"
COPY . .
WORKDIR "/src/KrakenSoftware.Starfield.Planner.WebApi"
RUN dotnet build "KrakenSoftware.Starfield.Planner.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KrakenSoftware.Starfield.Planner.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KrakenSoftware.Starfield.Planner.WebApi.dll"]