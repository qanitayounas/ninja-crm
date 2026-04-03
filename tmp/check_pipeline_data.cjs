const API_BASE = 'http://localhost:5000/api';

async function testPipelines() {
  console.log('--- Pipeline & Opportunity Data Check ---');

  try {
    const pipelinesRes = await fetch(`${API_BASE}/pipelines`);
    const pipelinesData = await pipelinesRes.json();
    console.log('Pipelines found:', pipelinesData.pipelines?.length || 0);
    if (pipelinesData.pipelines?.length > 0) {
      console.log('First Pipeline ID:', pipelinesData.pipelines[0].id);
      console.log('Stages in first pipeline:', pipelinesData.pipelines[0].stages?.length || 0);
    } else {
      console.log('Full Pipelines Response:', JSON.stringify(pipelinesData, null, 2));
    }

    const opportunitiesRes = await fetch(`${API_BASE}/opportunities`);
    const opportunitiesData = await opportunitiesRes.json();
    console.log('Opportunities found:', opportunitiesData.opportunities?.length || 0);
    if (opportunitiesData.opportunities?.length > 0) {
      const first = opportunitiesData.opportunities[0];
      console.log('First Opportunity Example:');
      console.log('- ID:', first.id);
      console.log('- PipelineID:', first.pipelineId);
      console.log('- StageID:', first.pipelineStageId);
      console.log('- Contact Name:', first.contact?.name);
    } else {
      console.log('Full Opportunities Response:', JSON.stringify(opportunitiesData, null, 2));
    }

  } catch (err) {
    console.error('❌ Data Check Error:', err.message);
  }

  console.log('--- Check Completed ---');
}

testPipelines();
