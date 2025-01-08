import { Suspense } from 'react';
import { ProjectStatusCardServer } from '@/components/common/cards/_api/projectStatus';
import { DashboardClientWrapper } from './_components/dashboardClientWrapper';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/toaster';

// Dynamic imports for client components
const AnimatedSideNav = dynamic(() => import('@/components/common/sideBar/animatedSideNav'), { ssr: true });
const TopBar = dynamic(() => import('@/components/common/topBar/topBar'), { ssr: true });
const ApplicationsCard = dynamic(() => import('@/components/common/cards/applicationCountCard'), { ssr: true });
const PieChartComponent = dynamic(() => import('@/components/common/charts/pieChartComponent'), { ssr: true });
const ProjectStatusCard = dynamic(() => import('@/components/common/cards/projectStatusCard'), { ssr: true });

export default async function Page() {
  // Fetch project data server-side
  const { cardsData, isEmpty } = await ProjectStatusCardServer();

  return (
    <div className='flex h-screen bg-gray-100 w-[-webkit-fill-available]'>
      <AnimatedSideNav />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar />

        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
          <div className='p-6 space-y-6'>
            {/* Analytics Cards Section */}
            <Suspense fallback={<div>Loading analytics...</div>}>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <ApplicationsCard
                  totalCount={94}
                  upToDateCount={70}
                  needUpdateCount={24}
                />
                <PieChartComponent
                  data={[
                    { name: 'Non-Compliant', value: 30, color: '#eb737e' },
                    { name: 'Compliant', value: 70, color: '#53af69' },
                  ]}
                  title={'Compliance Status'}
                  showPercentage={true}
                  showLegend={true}
                />
                <PieChartComponent
                  data={[{ name: 'Modernised', value: 70, color: '#6e5ed8' }]}
                  title={'Modernisation Progress'}
                  showPercentage={true}
                  showLegend={true}
                />
              </div>
            </Suspense>

            {/* Projects Section */}
            <div className='space-y-4'>
              {/* Client-side interactive components */}
                            {/* Server-side rendered project cards */}
              {/* <Suspense fallback={<div>Loading projects...</div>}> */}
              <DashboardClientWrapper />
              {isEmpty ? (<div className='flex justify-center items-center h-full text-center text-gray-500 py-6 font-bold text-2xl'>
                      <p>No projects found. Create a new project to get started.</p>
              </div>) : (

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {cardsData.map((card, index) => (
                      <ProjectStatusCard key={index} {...card} />
                    ))}
                </div>)}
              {/* </Suspense> */}
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}