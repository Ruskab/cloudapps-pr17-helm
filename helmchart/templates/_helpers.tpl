{{/*
Expand the name of the chart.
*/}}
{{- define "eoloserver.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "eoloserver.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "weatherservice.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}


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
{{- define "eoloserver.selectorLabels" -}}
app.kubernetes.io/name: {{ include "eoloserver.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}


{{/*
Create the name of the service account to use
*/}}
{{- define "eoloserver.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "eoloserver.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "weatherservice.app" -}}
{{- printf "%s-weatherservice" .Release.Name }}
{{- end }}

{{- define "planner.app" -}}
{{- printf "%s-planner" .Release.Name }}
{{- end }}

{{- define "server.app" -}}
{{- printf "%s-server" .Release.Name }}
{{- end }}

{{- define "toposervice.app" -}}
{{- printf "%s-toposervice" .Release.Name }}
{{- end }}

{{- define "mongodb.app" -}}
{{- printf "%s-mongodb" .Release.Name }}
{{- end }}

{{- define "mysql.app" -}}
{{- printf "%s-mysql" .Release.Name }}
{{- end }}


{{- define "rabbitmq.app" -}}
{{- printf "%s-rabbitmq" .Release.Name }}
{{- end }}


{{- define "mongodb.storageClass" -}}
{{- printf "%s-mongodb" .Release.Name }}
{{- end }}

