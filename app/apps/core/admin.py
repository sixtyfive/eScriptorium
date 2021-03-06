from django.contrib import admin

from core.models import (Document,
                         DocumentPart,
                         Metadata,
                         DocumentMetadata,
                         LineTranscription,
                         OcrModel,
                         Script,
                         DocumentType,
                         DocumentPartType,
                         BlockType,
                         LineType)


class MetadataInline(admin.TabularInline):
    model = DocumentMetadata


class DocumentAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'owner']
    inlines = (MetadataInline,)


class DocumentPartAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'document']
    actions = ['recover']

    def recover(self, request, queryset):
        for instance in queryset:
            instance.recover()


class LineTranscriptionAdmin(admin.ModelAdmin):
    raw_id_fields = ('line',)


class ScriptAdmin(admin.ModelAdmin):
    list_display = ['name', 'text_direction']
    list_filter = ['text_direction']


class OcrModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'job', 'owner', 'script', 'training']


admin.site.register(Document, DocumentAdmin)
admin.site.register(DocumentPart, DocumentPartAdmin)
admin.site.register(LineTranscription, LineTranscriptionAdmin)
admin.site.register(DocumentType)
admin.site.register(DocumentPartType)
admin.site.register(BlockType)
admin.site.register(LineType)
admin.site.register(Script, ScriptAdmin)
admin.site.register(Metadata)
admin.site.register(OcrModel, OcrModelAdmin)
