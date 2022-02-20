import * as vscode from 'vscode';

export function getPositionForNewFunction(impInHeader: boolean = false) : number
{
	var line: vscode.TextLine;
	const editor = vscode.window.activeTextEditor;
	if (!editor) 
	{
		return 0;
	}

	var i: number = 0;
	line = editor.document.lineAt(i);

	if (impInHeader)
	{
		while (!line.text.includes("endif"))
		{
			i++;
			line = editor.document.lineAt(i);
		}
	}
	else
	{
		while (!line.text.includes("private:") && "};" !== line.text )
		{
			i++;
			line = editor.document.lineAt(i);
		}
	}	

	return --i;	 
}


export function getClassName() : string
{
	var lineText: vscode.TextLine;
	const editor = vscode.window.activeTextEditor;
	if (!editor) 
	{
		return '';
	}

	var i: number = editor.selection.active.line;
	lineText = editor.document.lineAt(i);
	
	while (!lineText.text.includes("class") && 0 !== i)
	{
		i--;
		lineText = editor.document.lineAt(i);
	}

	let className = lineText.text.split(' ');

	return className[1];	 
}

export function optionBoxsForWherePutTheCode()
{
	var option: vscode.QuickPickOptions = 
	{
        title: "choose where to put the implementaion"        	
		//canPickMany: true	
	};

	return vscode.window.showQuickPick(
		[
			{label: "inline", description: "implemntaion in header class"}, 
			{label: "suorce file", description: "decleration in header, implemntaion in source"}, 
			{label: "header file", description: "decleration and implemntaion in header"}
		], option);
}


