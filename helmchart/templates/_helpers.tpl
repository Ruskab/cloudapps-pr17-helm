{{/*
Expand the name of the chart.
*/}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "eoloserver.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "eoloserver.labels" -}}
helm.sh/chart: {{ include "eoloserver.chart" . }}
{{ include "eoloserver.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}

{{/*
Create the name of the service account to use
*/}}


{{- define "weatherservice.app" -}}
{{- printf "%s-weatherservice" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "planner.app" -}}
{{- printf "%s-planner" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "server.app" -}}
{{- printf "%s-server" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "toposervice.app" -}}
{{- printf "%s-toposervice" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "mongodb.app" -}}
{{- printf "%s-mongodb" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "mysql.app" -}}
{{- printf "%s-mysql" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}


{{- define "rabbitmq.app" -}}
{{- printf "%s-rabbitmq" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}


{{- define "mongodb.storageClass" -}}
{{- printf "%s-mongodb" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

