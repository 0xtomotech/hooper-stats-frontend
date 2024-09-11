# 🏀 Hooper Stats Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

## 📊 A Proof of Concept Experiment

Hooper Stats Frontend is an innovative proof of concept designed to bring NBA player statistics to life, with a primary focus on three-point shooting performance. Built with Next.js and powered by Supabase, this project offers a dynamic and interactive way to visualize player data.

### ✨ Key Features

- 🎯 Three-point shooting percentage visualization
- 📈 Interactive area charts for player comparison
- 🔄 Real-time data fetching from Supabase
- 🎨 Responsive design with Tailwind CSS
- 🌓 Light and dark mode support

## 🛠 Tech Stack

| Technology   | Version | Purpose              |
| ------------ | ------- | -------------------- |
| Next.js      | 14.2.5  | React framework      |
| React        | 18      | UI library           |
| TypeScript   | 5       | Type-safe JavaScript |
| Tailwind CSS | 3.4.1   | Utility-first CSS    |
| Supabase     | -       | Backend as a Service |
| Recharts     | -       | Data visualization   |
| ShadcnUI     | -       | UI components        |

## 🚀 Getting Started

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/hooper-stats-frontend.git
   cd hooper-stats-frontend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the project root:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

The project follows a modern Next.js structure with custom organization for enhanced maintainability:

### Key Directories and Files

- `public/`: Static assets that are served directly.
- `src/`: Contains the main source code for the application.
  - `app/`: Next.js 13+ app directory for routing and layouts.
  - `components/`: Reusable React components.
    - `ui/`: UI components, likely from ShadcnUI.
    - `complex-area-chart.tsx`: Component for rendering the area chart.
    - `complex-data-fetch.tsx`: Component for fetching and processing complex data.
    - `simple-data-fetch.tsx`: Component for basic data fetching.
  - `lib/`: Utility functions and shared code.
  - `utils/`: Utility functions, including Supabase client setup.
- `styles/`: Global styles and Tailwind CSS configuration.
- `.env.local`: Environment variables (not tracked in git).
- `next.config.js`: Next.js configuration file.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

### Key Components

- `complex-area-chart.tsx`: Renders the interactive area chart using Recharts.
- `complex-data-fetch.tsx`: Handles fetching and processing data for advanced visualizations.
- `simple-data-fetch.tsx`: Demonstrates basic data fetching from Supabase.

### Data Flow

1. Data is fetched from Supabase using the client defined in `src/utils/supabase.ts`.
2. Components like `simple-data-fetch.tsx` and `complex-data-fetch.tsx` manage data fetching and state.
3. Visualization components like `complex-area-chart.tsx` render the processed data.

This structure allows for a clean separation of concerns between data fetching, processing, and visualization, making the codebase modular and maintainable.

## 🔐 Environment Variables

The project uses the following environment variables, which should be defined in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.

Ensure these are set correctly for the application to function properly.

## 📚 Documentation

For more detailed documentation on the components and their usage, please refer to the comments within each component file.

## 🚀 Deployment

This project is set up to be easily deployed on Vercel, which is optimized for Next.js applications. To deploy:

1. Push your code to a GitHub repository.
2. Connect your GitHub account to Vercel.
3. Import the project from your GitHub repository.
4. Configure your environment variables in the Vercel dashboard.
5. Deploy!

For other hosting platforms, make sure to build the project using `npm run build` before deploying the resulting `/.next` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Recharts](https://recharts.org/en-US/)
- [ShadcnUI](https://ui.shadcn.com/)
