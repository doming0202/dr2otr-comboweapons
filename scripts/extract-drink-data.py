#!/usr/bin/env python3
"""
トランスクリプトから飲み物レシピデータを抽出
"""

import re
import sys

def extract_data_from_transcript(transcript_path):
    """トランスクリプトからデータ行を抽出"""
    with open(transcript_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # user:セクションを抽出（より柔軟なパターン）
    user_match = re.search(r'^user:\s*\n<user_query>\n(.*?)(?=\nassistant:|\n\[Tool)', content, re.DOTALL | re.MULTILINE)
    if not user_match:
        # 別のパターンを試す
        user_match = re.search(r'user:\s*\n<user_query>\n(.*?)(?=\nassistant:)', content, re.DOTALL)
        if not user_match:
            print("Could not find user query section")
            # 最初の1000行を確認
            first_lines = content.split('\n')[:100]
            print("First 100 lines:")
            for i, line in enumerate(first_lines):
                if 'Creates' in line or 'Dead rising' in line:
                    print(f"Line {i}: {line[:100]}")
            return []
    
    user_content = user_match.group(1)
    lines = user_content.split('\n')
    print(f"Found user content, {len(lines)} lines")
    
    data_lines = []
    in_data_section = False
    
    for line in lines:
        line = line.strip()
        
        # データセクションの開始を検出
        if line == "Creates" or (line.startswith("Creates") and "Ingredient" in line):
            in_data_section = True
            continue
        
        # データ行を抽出
        if in_data_section and line:
            # "Dead rising" で始まる行、または飲み物名の行（単独の大文字で始まる行）
            if line.startswith("Dead rising"):
                data_lines.append(line)
            elif re.match(r'^[A-Z][a-zA-Z\s]+$', line) and line not in ['Creates', 'Ingredient one', 'Ingredient two']:
                # 飲み物名の行（Energizer, Nectarなど）
                data_lines.append(line)
    
    return data_lines

if __name__ == '__main__':
    transcript_path = r'C:\Users\domin\.cursor\projects\f-dr2otr-comboweapons/agent-transcripts/8bfa0e70-6ed9-44e6-a2ff-12854a144a2e.txt'
    output_path = 'scripts/drink-data-raw.txt'
    
    data_lines = extract_data_from_transcript(transcript_path)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        for line in data_lines:
            f.write(line + '\n')
    
    print(f"Extracted {len(data_lines)} lines to {output_path}")
