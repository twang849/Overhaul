import Head from 'next/head';
import Layout from '../components/Layout';
import ObjectDetection from '../components/ObjectDetection';

export default function DetectPage() {
  return (
    <Layout>
      <Head>
        <title>Object Detection - Overhaul</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Object Detection</h1>
        <p className="mb-4">Upload an image to detect objects using our AI system.</p>
        
        <ObjectDetection />
      </div>
    </Layout>
  );
}