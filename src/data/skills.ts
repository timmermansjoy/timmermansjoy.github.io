import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'C', 'C++', 'C#', 'Java', 'Kotlin'],
  },
  {
    label: 'AI & CV',
    items: [
      'PyTorch',
      'TensorFlow',
      'Tinygrad',
      'FiftyOne',
      'Weights & Biases',
      'Pandas',
      'CVAT',
      'Ultralytics',
      'Roboflow',
    ],
  },
  {
    label: 'LLMs & Agentic AI',
    items: [
      'RAG',
      'LangChain',
      'LangGraph',
      'MCP',
      'LlamaIndex',
      'Ollama',
      'Hugging Face',
      'Qdrant',
      'Whisper',
    ],
  },
  {
    label: 'Edge & Inference',
    items: ['ONNX', 'TensorRT', 'DeepStream', 'ROS 2', 'Yocto', 'Embedded Linux'],
  },
  {
    label: 'Video & Streaming',
    items: ['OpenCV', 'FFmpeg', 'GStreamer'],
  },
  {
    label: 'Engineering & Cloud',
    items: [
      'AWS',
      'Azure',
      'Docker',
      'Git',
      'Bash',
      'GitHub Actions',
      'FastAPI',
      'Django',
      'React Native',
      'Laravel',
      'SQLite',
      'MongoDB',
    ],
  },
  {
    label: 'Other',
    items: ['Unity', 'Gazebo', 'LaTeX', 'Figma'],
  },
];
