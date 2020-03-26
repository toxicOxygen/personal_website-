# Generated by Django 3.0.4 on 2020-03-11 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=200)),
                ('html_file', models.FileField(upload_to='js_projects/html/%Y/%m/%d/')),
                ('js_file', models.FileField(upload_to='js_projects/js/%Y/%m/%d/')),
                ('css_file', models.FileField(blank=True, upload_to='js_projects/css/%Y/%m/%d/')),
            ],
        ),
    ]
