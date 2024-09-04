export const dataPreprocessingFlow = {
  "nodes": [
    {
      "id": "input",
      "type": "input",
      "data": {
        "label": "Data Input",
        "description": "Load raw data from source"
      },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "cleaning",
      "type": "default",
      "data": {
        "label": "Data Cleaning",
        "description": "Handle missing values, outliers, and inconsistencies",
        "options": [
          {
            "name": "missing_values",
            "type": "select",
            "choices": ["drop", "mean", "median", "mode", "constant"],
            "default": "mean"
          },
          {
            "name": "outlier_method",
            "type": "select",
            "choices": ["zscore", "iqr", "isolation_forest"],
            "default": "zscore"
          },
          {
            "name": "outlier_threshold",
            "type": "float",
            "default": 3.0
          }
        ]
      },
      "position": { "x": 200, "y": 0 }
    },
    {
      "id": "encoding",
      "type": "default",
      "data": {
        "label": "Feature Encoding",
        "description": "Encode categorical variables",
        "options": [
          {
            "name": "method",
            "type": "select",
            "choices": ["one_hot", "label", "binary", "frequency"],
            "default": "one_hot"
          },
          {
            "name": "handle_unknown",
            "type": "select",
            "choices": ["error", "ignore"],
            "default": "error"
          }
        ]
      },
      "position": { "x": 400, "y": 0 }
    },
    {
      "id": "scaling",
      "type": "default",
      "data": {
        "label": "Feature Scaling",
        "description": "Normalize or standardize numerical features",
        "options": [
          {
            "name": "method",
            "type": "select",
            "choices": ["minmax", "standard", "robust", "normalizer"],
            "default": "standard"
          },
          {
            "name": "feature_range",
            "type": "tuple",
            "default": [0, 1]
          }
        ]
      },
      "position": { "x": 600, "y": 0 }
    },
    {
      "id": "feature_selection",
      "type": "default",
      "data": {
        "label": "Feature Selection",
        "description": "Select most relevant features",
        "options": [
          {
            "name": "method",
            "type": "select",
            "choices": ["variance", "correlation", "mutual_info", "chi2", "rfe"],
            "default": "variance"
          },
          {
            "name": "k",
            "type": "int",
            "default": 10
          }
        ]
      },
      "position": { "x": 800, "y": 0 }
    },
    {
      "id": "dimensionality_reduction",
      "type": "default",
      "data": {
        "label": "Dimensionality Reduction",
        "description": "Reduce number of features",
        "options": [
          {
            "name": "method",
            "type": "select",
            "choices": ["pca", "lda", "t-sne", "umap"],
            "default": "pca"
          },
          {
            "name": "n_components",
            "type": "int",
            "default": 2
          }
        ]
      },
      "position": { "x": 1000, "y": 0 }
    },
    {
      "id": "balancing",
      "type": "default",
      "data": {
        "label": "Class Balancing",
        "description": "Handle imbalanced datasets",
        "options": [
          {
            "name": "method",
            "type": "select",
            "choices": ["oversampling", "undersampling", "smote"],
            "default": "smote"
          },
          {
            "name": "ratio",
            "type": "float",
            "default": 1.0
          }
        ]
      },
      "position": { "x": 1200, "y": 0 }
    },
    {
      "id": "output",
      "type": "output",
      "data": {
        "label": "Preprocessed Data",
        "description": "Output preprocessed data for modeling"
      },
      "position": { "x": 1400, "y": 0 }
    }
  ],
  "edges": [
    { "id": "e1", "source": "input", "target": "cleaning" },
    { "id": "e2", "source": "cleaning", "target": "encoding" },
    { "id": "e3", "source": "encoding", "target": "scaling" },
    { "id": "e4", "source": "scaling", "target": "feature_selection" },
    { "id": "e5", "source": "feature_selection", "target": "dimensionality_reduction" },
    { "id": "e6", "source": "dimensionality_reduction", "target": "balancing" },
    { "id": "e7", "source": "balancing", "target": "output" }
  ]
};

export const modelExecutionFlow = {
  "nodes": [
    {
      "id": "model-execution-1",
      "type": "modelExecution",
      "data": {
        "label": "Multi-Modal Fusion",
        "description": "Execute multi-modal fusion model",
        "settings": {
          "name": "Multi-Modal Fusion",
          "type": "Data Fusion",
          "modelName": {
            "type": "select",
            "label": "Model Name",
            "options": [
              "GPT-3.5-turbo",
              "GPT-4",
              "BERT",
              "RoBERTa",
              "CLIP",
              "Custom Model"
            ],
            "default": "Select model"
          },
          "temperature": {
            "type": "float",
            "label": "Temperature",
            "min": 0,
            "max": 2,
            "step": 0.1,
            "default": 0.7
          },
          "maxTokens": {
            "type": "integer",
            "label": "Max Tokens",
            "min": 1,
            "max": 4096,
            "default": 100
          },
          "role": {
            "type": "string",
            "label": "Role",
            "placeholder": "Enter model role or context"
          },
          "capabilities": {
            "type": "textarea",
            "label": "Capabilities",
            "placeholder": "Describe model capabilities and limitations"
          },
          "topP": {
            "type": "float",
            "label": "Top P",
            "min": 0,
            "max": 1,
            "step": 0.01,
            "default": 1
          },
          "frequencyPenalty": {
            "type": "float",
            "label": "Frequency Penalty",
            "min": -2,
            "max": 2,
            "step": 0.1,
            "default": 0
          },
          "presencePenalty": {
            "type": "float",
            "label": "Presence Penalty",
            "min": -2,
            "max": 2,
            "step": 0.1,
            "default": 0
          },
          "stopSequences": {
            "type": "array",
            "label": "Stop Sequences",
            "items": {
              "type": "string"
            },
            "default": []
          },
          "batchSize": {
            "type": "integer",
            "label": "Batch Size",
            "min": 1,
            "max": 64,
            "default": 1
          },
          "seed": {
            "type": "integer",
            "label": "Random Seed",
            "min": 0,
            "default": null
          },
          "outputFormat": {
            "type": "select",
            "label": "Output Format",
            "options": ["JSON", "Plain Text", "Markdown", "HTML"],
            "default": "JSON"
          },
          "useCache": {
            "type": "boolean",
            "label": "Use Cache",
            "default": true
          },
          "timeout": {
            "type": "integer",
            "label": "Timeout (seconds)",
            "min": 1,
            "max": 300,
            "default": 30
          }
        },
        "inputConnectors": [
          {
            "id": "input-1",
            "label": "Text Input"
          },
          {
            "id": "input-2",
            "label": "Image Input"
          }
        ],
        "outputConnectors": [
          {
            "id": "output-1",
            "label": "Fused Output"
          }
        ]
      },
      "position": {
        "x": 500,
        "y": 300
      },
      "width": 250,
      "height": 150
    }
  ],
  "edges": []
};

export const flowTypeToNodes = {
  "Data Preprocessing": ["Input", "Cleansing", "Transformation", "Output"],
  "Model Execution": ["Input", "Model", "Inference", "Output"],
  "Conditional Branching": ["Input", "Condition", "Branch A", "Branch B", "Merge", "Output"],
  "Iterative Processing": ["Input", "Loop Start", "Process", "Loop End", "Output"],
  "Parallel Processing": ["Input", "Split", "Process A", "Process B", "Join", "Output"],
  "Data Fusion": ["Input A", "Input B", "Fusion", "Analysis", "Output"],
  "Feedback Loops": ["Input", "Process", "Evaluation", "Feedback", "Output"],
  "Pipeline Orchestration": ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Output"],
  "Interactive Query": ["User Input", "Query Processing", "Database", "Result Formatting", "Output"],
  "Output Generation": ["Input", "Processing", "Formatting", "Visualization", "Output"]
};